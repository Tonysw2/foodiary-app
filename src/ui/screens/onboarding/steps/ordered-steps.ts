import type { OnboardingStackParamList } from '../onboarding-stack/types'

export const orderedSteps: (keyof OnboardingStackParamList)[] = [
  'Goal',
  'Gender',
  'BirthDate',
  'Height',
  'Weight',
  'ActivityLevel',
  'CreateAccount',
]

export const TOTAL_STEPS = orderedSteps.length
