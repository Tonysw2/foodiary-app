import { Service } from './service'

export class GoalsService extends Service {
  static async updateGoals(payload: GoalsService.UpdateGoalsPayload) {
    const { data } =
      await GoalsService.client.put<GoalsService.UpdateGoalsResponse>(
        '/users/goals',
        payload,
      )

    return data
  }
}

export namespace GoalsService {
  export type UpdateGoalsPayload = {
    calories: number
    proteins: number
    carbohydrates: number
    fats: number
  }

  export type UpdateGoalsResponse = undefined
}
