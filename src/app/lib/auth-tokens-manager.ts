// biome-ignore-all lint/complexity/noStaticOnlyClass: intentional static-only class

import AsyncStorage from '@react-native-async-storage/async-storage'

export class AuthTokensManager {
  private static KEY = '@foodiary:auth-tokens'

  static async save(tokens: AuthTokensManager.Tokens) {
    await AsyncStorage.setItem(AuthTokensManager.KEY, JSON.stringify(tokens))
  }

  static async load(): Promise<AuthTokensManager.Tokens | null> {
    try {
      const data = await AsyncStorage.getItem(AuthTokensManager.KEY)

      if (!data) return null

      return JSON.parse(data)
    } catch {
      return null
    }
  }

  static async clear() {
    await AsyncStorage.removeItem(AuthTokensManager.KEY)
  }
}

export namespace AuthTokensManager {
  export type Tokens = {
    accessToken: string
    refreshToken: string
  }
}
