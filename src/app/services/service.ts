/** biome-ignore-all lint/complexity/noStaticOnlyClass: abstract base class used for inheritance — static client is shared across all service subclasses */
import { env } from '@app/config/env'
import axios, { isAxiosError } from 'axios'
import base64 from 'react-native-base64'

export abstract class Service {
  private static refreshTokenInterceptorId: number | undefined

  protected static client = axios.create({
    baseURL: env.api.url,
  })

  static setAccessToken(accessToken: string) {
    Service.client.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  }

  static clearAccessToken() {
    delete Service.client.defaults.headers.common.Authorization
  }

  static removeRefreshTokenHandler() {
    if (Service.refreshTokenInterceptorId !== undefined) {
      Service.client.interceptors.response.eject(
        Service.refreshTokenInterceptorId,
      )
      Service.refreshTokenInterceptorId = undefined
    }
  }

  static setRefreshTokenHandler(refreshFn: () => Promise<void>) {
    Service.removeRefreshTokenHandler()
    Service.refreshTokenInterceptorId =
      Service.client.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (
            !isAxiosError(error) ||
            error.response?.status !== 401 ||
            !error.config ||
            error.config.url === '/auth/refresh-token'
          ) {
            return Promise.reject(error)
          }
          await refreshFn()
          return Service.client(error.config)
        },
      )
  }

  static async uploadWithSignature({
    uploadSignature,
    file,
  }: Service.UploadPresignedPOSTParams) {
    const decodedSignature = base64.decode(uploadSignature)
    const { url, fields } = JSON.parse(
      decodedSignature,
    ) as Service.DecodedUploadSignature
    const form = new FormData()

    for (const [key, value] of Object.entries(fields)) {
      form.append(key, value)
    }

    form.append('file', file as any)

    await fetch(url, { method: 'POST', body: form })
  }
}

export namespace Service {
  export type UploadPresignedPOSTParams = {
    uploadSignature: string
    file: {
      type: string
      name: string
      uri: string
    }
  }

  export type DecodedUploadSignature = {
    url: string
    fields: Record<string, string>
  }
}
