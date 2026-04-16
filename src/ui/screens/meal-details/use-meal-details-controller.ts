import { getMealByIdQueryOptions } from '@app/lib/query-options/get-meal-by-id-query-options'
import type { AppStackParamList } from '@app/navigation/app-stack/types'
import type { RouteProp } from '@react-navigation/native'
import { useNavigation, useRoute } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useQuery } from '@tanstack/react-query'

export function useMealDetailsController() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  const route = useRoute<RouteProp<AppStackParamList, 'MealDetails'>>()
  const { mealId } = route.params

  const { data, isFetching } = useQuery(getMealByIdQueryOptions(mealId))

  function goBack() {
    navigation.goBack()
  }

  return {
    meal: data?.meal,
    isFetching,
    goBack,
  }
}
