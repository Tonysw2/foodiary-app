import { useForceRender } from '@app/hooks/use-force-render'
import { AuthTokensManager } from '@app/lib/auth-tokens-manager'
import { getAccountQueryOptions } from '@app/lib/query-options/get-account-query-options'
import { AuthService } from '@app/services/auth-service'
import { Service } from '@app/services/service'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import * as SplashScreen from 'expo-splash-screen'
import {
  createContext,
  use,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react'

interface AuthContextValue {
  signedIn: boolean
  signedUp: boolean
  signIn: (payload: AuthService.SignInPayload) => Promise<void>
  signUp: (payload: AuthService.SignUpPayload) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextValue)

SplashScreen.preventAutoHideAsync()

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isReady, setIsReady] = useState(false)
  const [signedUp, setSignedUp] = useState(false)

  const queryClient = useQueryClient()
  const forceRender = useForceRender()

  const { data: account, refetch: loadAccount } = useQuery(
    getAccountQueryOptions(),
  )

  const signOut = useCallback(async () => {
    await AuthTokensManager.clear()
    Service.clearAccessToken()
    Service.removeRefreshTokenHandler()
    queryClient.clear()
    forceRender()
  }, [queryClient, forceRender])

  const setupAuth = useCallback(
    async (tokens: { accessToken: string; refreshToken: string }) => {
      Service.setAccessToken(tokens.accessToken)
      Service.setRefreshTokenHandler(async () => {
        try {
          const storedTokens = await AuthTokensManager.load()
          if (!storedTokens) {
            throw new Error('Tokens not found')
          }
          const newTokens = await AuthService.refreshToken({
            refreshToken: storedTokens.refreshToken,
          })
          Service.setAccessToken(newTokens.accessToken)
          await AuthTokensManager.save(newTokens)
        } catch (error) {
          signOut()
          throw error
        }
      })
      await loadAccount()
      SplashScreen.hideAsync()
      setIsReady(true)
    },
    [loadAccount, signOut],
  )

  useLayoutEffect(() => {
    async function load() {
      const tokens = await AuthTokensManager.load()
      if (!tokens) {
        SplashScreen.hideAsync()
        setIsReady(true)
        return
      }
      await setupAuth(tokens)
    }

    load()
  }, [setupAuth])

  const signIn = useCallback(
    async (payload: AuthService.SignInPayload) => {
      const tokens = await AuthService.signIn(payload)
      await AuthTokensManager.save(tokens)
      await setupAuth(tokens)
    },
    [setupAuth],
  )

  const signUp = useCallback(
    async (payload: AuthService.SignUpPayload) => {
      const tokens = await AuthService.signUp(payload)
      await AuthTokensManager.save(tokens)
      await setupAuth(tokens)
      setSignedUp(true)
    },
    [setupAuth],
  )

  if (!isReady) {
    return null
  }

  return (
    <AuthContext.Provider
      value={{ signedIn: !!account, signedUp, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = use(AuthContext)

  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return ctx
}
