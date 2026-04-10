import { getAccountQueryOptions } from '@app/lib/query-options/get-account-query-options'
import { useQuery } from '@tanstack/react-query'
import { GoalStats } from '@ui/components/goal-stats'
import { useMemo } from 'react'
import { View } from 'react-native'
import { useHomeContext } from '../../context/home-context'
import { styles } from './styles'

export function CurrentGoal() {
  const { meals, isLoading } = useHomeContext()
  const { data: account } = useQuery(getAccountQueryOptions())

  const consumed = useMemo(
    () =>
      meals
        .flatMap((m) => m.foods)
        .reduce(
          (acc, f) => ({
            calories: acc.calories + f.calories,
            proteins: acc.proteins + f.proteins,
            carbohydrates: acc.carbohydrates + f.carbohydrates,
            fats: acc.fats + f.fats,
          }),
          { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 },
        ),
    [meals],
  )

  return (
    <View style={[styles.container, { opacity: isLoading ? 0.5 : 1 }]}>
      <GoalStats
        calories={{ goal: account!.goal.calories, current: consumed.calories }}
        carbohydrates={{
          goal: account!.goal.carbohydrates,
          current: consumed.carbohydrates,
        }}
        fats={{ goal: account!.goal.fats, current: consumed.fats }}
        proteins={{ goal: account!.goal.proteins, current: consumed.proteins }}
      />
    </View>
  )
}
