import type { Gender } from '@app/types/gender'
import type { Goal } from '@app/types/goal'
import { Service } from './service'

export class AccountService extends Service {
  static async getMe({ signal }: AccountService.GetMePayload) {
    const { data } =
      await AccountService.client.get<AccountService.GetMeResponse>(
        '/users/me',
        {
          signal,
        },
      )

    return data
  }
}

export namespace AccountService {
  export type GetMePayload = {
    signal: AbortSignal
  }

  export type GetMeResponse = {
    profile: {
      name: string
      birthDate: string
      gender: Gender
      height: number
      weight: number
      goal: Goal
    }
    goal: {
      calories: number
      proteins: number
      carbohydrates: number
      fats: number
    }
  }
}
