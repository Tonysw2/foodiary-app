import { MealsService } from '@app/services/meals-service'
import { queryOptions } from '@tanstack/react-query'

export const mealsQueryKeys = {
  all: ['meals'] as const,
  byDay: (date: string) => [...mealsQueryKeys.all, { date }] as const,
}

export const getMealsQueryOptions = (date: Date) => {
  const [formattedDate] = date.toISOString().split('T')

  return queryOptions({
    queryKey: mealsQueryKeys.byDay(formattedDate),
    queryFn: ({ signal }) =>
      MealsService.listMealsByDay({ date: formattedDate, signal }),
    staleTime: Number.POSITIVE_INFINITY,
  })
}
