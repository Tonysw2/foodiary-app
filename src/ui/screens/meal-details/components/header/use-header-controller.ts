import type { Meal } from '@app/types/meal'
import { useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface UseHeaderControllerParams {
  meal: Meal | null
}

export function useHeaderController({ meal }: UseHeaderControllerParams) {
  const { top } = useSafeAreaInsets()

  const isPicture = meal?.inputType === 'PICTURE'

  const summary = useMemo(
    () =>
      (meal?.foods ?? []).reduce(
        (acc, food) => {
          const proteinsCalories = food.proteins * 4
          const carbohydratesCalories = food.carbohydrates * 4
          const fatsCalories = food.fats * 9
          const totalCalories = Math.round(
            proteinsCalories + carbohydratesCalories + fatsCalories,
          )

          return {
            calories: acc.calories + totalCalories,
            proteins: acc.proteins + food.proteins,
            carbohydrates: acc.carbohydrates + food.carbohydrates,
            fats: acc.fats + food.fats,
          }
        },
        { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 },
      ),
    [meal?.foods],
  )

  const percentages = useMemo(() => {
    const protCalories = summary.proteins * 4
    const carbCalories = summary.carbohydrates * 4
    const fatsCalories = summary.fats * 9

    if (summary.calories === 0) {
      return { carbPercentage: 0, fatPercentage: 0, protPercentage: 0 }
    }

    return {
      carbPercentage: Math.round((carbCalories * 100) / summary.calories),
      protPercentage: Math.round((protCalories * 100) / summary.calories),
      fatPercentage: Math.round((fatsCalories * 100) / summary.calories),
    }
  }, [summary])

  return { top, isPicture, summary, percentages }
}
