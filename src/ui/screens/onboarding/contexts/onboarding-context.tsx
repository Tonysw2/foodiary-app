import { createContext, use } from 'react'

export type OnboardingContextValue = {
  currentIndex: number
  nextStep: () => void
  previousStep: () => void
}

export const OnboardingContext = createContext<OnboardingContextValue | null>(null)

export function useOnboarding() {
  const ctx = use(OnboardingContext)

  if (!ctx) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }

  return ctx
}
