import { getAccountQueryOptions } from '@app/lib/query-options/get-account-query-options'
import { useQuery } from '@tanstack/react-query'
import { GoalStats } from '@ui/components/goal-stats'
import { View } from 'react-native'

export function CurrentGoal() {
  const { data: account } = useQuery(getAccountQueryOptions())

  return (
    <View style={{ alignItems: 'center' }}>
      <GoalStats
        calories={{ goal: account!.goal.calories }}
        carbohydrates={{ goal: account!.goal.carbohydrates }}
        fats={{ goal: account!.goal.fats }}
        proteins={{ goal: account!.goal.proteins }}
      />
    </View>
  )
}
