import { SafeAreaView } from 'react-native-safe-area-context'
import { OnboardingHeader } from './components/onboarding-header'
import { OnboardingProvider } from './contexts/onboarding-provider'
import { OnboardingStack } from './onboarding-stack'

export function Onboarding() {
  return (
    <OnboardingProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <OnboardingHeader />
        <OnboardingStack />
      </SafeAreaView>
    </OnboardingProvider>
  )
}
