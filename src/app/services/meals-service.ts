import type { Meal, SimplifiedMeal } from '@app/types/meal'
import { Service } from './service'

export class MealsService extends Service {
  static async listMealsByDay({
    date,
    signal,
  }: MealsService.ListMealsByDayPayload) {
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

  static async getMealById({
    mealId,
    signal,
  }: MealsService.GetMealByIdPayload): Promise<MealsService.GetMealByIdResponse> {
    const { data } =
      await MealsService.client.get<MealsService.GetMealByIdResponse>(
        `/meals/${mealId}`,
        { signal },
      )

    return data
  }

  static async createMeal(
    payload: MealsService.CreateMealPayload,
  ): Promise<MealsService.CreateMealResponse> {
    const { data } = await MealsService.client.post('/meals', {
      file: {
        inputType: payload.file.type,
        size: payload.file.size,
      },
    })

    await MealsService.uploadWithSignature({
      uploadSignature: data.uploadSignature,
      file: {
        name: payload.file.name,
        type: payload.file.type,
        uri: payload.file.uri,
      },
    })

    return {
      mealId: data.mealId,
    }
  }
}

export namespace MealsService {
  export type ListMealsByDayPayload = {
    date: string
    signal: AbortSignal
  }

  export type ListMealsByDayResponse = {
    meals: SimplifiedMeal[]
  }

  export type GetMealByIdPayload = {
    mealId: string
    signal: AbortSignal
  }

  export type GetMealByIdResponse = {
    meal: Meal
  }

  export type CreateMealPayload = {
    file: {
      type: 'audio/m4a' | 'image/jpeg'
      size: number
      uri: string
      name: string
    }
  }

  export type CreateMealResponse = {
    mealId: string
  }
}
