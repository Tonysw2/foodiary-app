import { MealsService } from '@app/services/meals-service'
import { queryOptions } from '@tanstack/react-query'
import { mealsQueryKeys } from './get-meals-query-options'

export const getMealByIdQueryOptions = (mealId?: string) =>
  queryOptions({
    enabled: !!mealId,
    queryKey: mealsQueryKeys.byId(mealId),
    queryFn: ({ signal }) => {
      if (!mealId) {
        return
      }

      return MealsService.getMealById({ mealId, signal })
    },
    staleTime: Number.POSITIVE_INFINITY,
    refetchInterval: (query) => {
      if (
        query.state.data?.meal.status === 'SUCCESS' ||
        query.state.data?.meal.status === 'FAILED'
      ) {
        return false
      }

      return 2_000
    },
  })
