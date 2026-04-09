import type { ActivityLevel } from '@app/types/activity-level'
import type { Gender } from '@app/types/gender'
import type { Goal } from '@app/types/goal'
import { Service } from './service'

export class AuthService extends Service {
  static async signIn({ email, password }: AuthService.SignInPayload) {
    const { data } = await AuthService.client.post<AuthService.SignInResponse>(
      '/auth/sign-in',
      {
        email,
        password,
      },
    )

    return data
  }

  static async signUp({ account, profile }: AuthService.SignUpPayload) {
    const { data } = await AuthService.client.post<AuthService.SignUpResponse>(
      '/auth/sign-up',
      {
        account,
        profile,
      },
    )

    return data
  }

  static async refreshToken({ refreshToken }: AuthService.RefreshTokenPayload) {
    const { data } =
      await AuthService.client.post<AuthService.RefreshTokenResponse>(
        '/auth/refresh-token',
        { refreshToken },
      )

    return data
  }
}

export namespace AuthService {
  export type SignInPayload = {
    email: string
    password: string
  }

  export type SignInResponse = {
    accessToken: string
    refreshToken: string
  }

  export type SignUpPayload = {
    account: {
      email: string
      password: string
    }
    profile: {
      name: string
      birthDate: string
      gender: Gender
      height: number
      weight: number
      activityLevel: ActivityLevel
      goal: Goal
    }
  }

  export type SignUpResponse = {
    accessToken: string
    refreshToken: string
  }

  export type RefreshTokenPayload = {
    refreshToken: string
  }

  export type RefreshTokenResponse = {
    accessToken: string
    refreshToken: string
  }
}
