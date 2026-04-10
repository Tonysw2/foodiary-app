import type { Meal } from '@app/types/meal'
import { Service } from './service'

export class MealsService extends Service {
  static async listMealsByDay({
    date,
    signal,
  }: MealsService.ListMealsByDayPayload) {
    console.log('running')
    const { data } =
      await MealsService.client.get<MealsService.ListMealsByDayResponse>(
        '/meals',
        {
          params: {
            date,
          },
          signal,
        },
      )

    return data
  }
}

export namespace MealsService {
  export type ListMealsByDayPayload = {
    date: string
    signal: AbortSignal
  }

  export type ListMealsByDayResponse = {
    meals: Meal[]
  }
}
