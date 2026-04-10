import { getMealsQueryOptions } from '@app/lib/query-options/get-meals-query-options'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function useHomeController() {
  const { top, bottom } = useSafeAreaInsets()
  const [date, setDate] = useState(new Date())
  const [isRefetching, setIsRefetching] = useState(false)

  const {
    data,
    isLoading,
    isFetching,
    refetch: refetchMeals,
  } = useQuery(getMealsQueryOptions(date))

  function nextDay() {
    setDate((d) => {
      const next = new Date(d)
      next.setDate(next.getDate() + 1)
      return next
    })
  }

  function previousDay() {
    setDate((d) => {
      const prev = new Date(d)
      prev.setDate(prev.getDate() - 1)
      return prev
    })
  }

  async function handleRefresh() {
    setIsRefetching(true)
    await refetchMeals()
    setIsRefetching(false)
  }

  return {
    top,
    bottom,
    date,
    data,
    isLoading,
    isFetching,
    isRefetching,
    refetchMeals,
    nextDay,
    previousDay,
    handleRefresh,
  }
}
