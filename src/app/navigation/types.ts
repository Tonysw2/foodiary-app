import type { AuthStackParamList } from './auth-stack/types'
import type { OnboardingStackParamList } from '@ui/screens/onboarding/onboarding-stack/types'

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends AuthStackParamList,
        OnboardingStackParamList {}
  }
}
