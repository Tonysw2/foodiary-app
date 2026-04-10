import type { Meal } from '@app/types/meal'
import { createContext, use } from 'react'

interface HomeContextValue {
  date: Date
  nextDay: () => void
  previousDay: () => void
  meals: Meal[]
  isLoading: boolean
  refetchMeals: () => Promise<unknown>
}

const HomeContext = createContext<HomeContextValue | null>(null)

interface HomeProviderProps extends HomeContextValue {
  children: React.ReactNode
}

export function HomeProvider({ children, ...ctxValues }: HomeProviderProps) {
  return (
    <HomeContext.Provider value={ctxValues}>{children}</HomeContext.Provider>
  )
}

export function useHomeContext() {
  const ctx = use(HomeContext)
  if (!ctx) throw new Error('useHomeContext must be used within HomeProvider')
  return ctx
}
