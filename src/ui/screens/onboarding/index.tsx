import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import { OnboardingHeader } from './components/onboarding-header'
import { OnboardingProvider } from './contexts/onboarding-provider'
import { OnboardingStack } from './onboarding-stack'
import { onboardingSchema } from './schema'

export function Onboarding() {
  const form = useForm({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      account: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      profile: {
        birthDate: new Date().toISOString(),
        height: 0,
        weight: 0,
      },
    },
  })

  return (
    <OnboardingProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <OnboardingHeader />
        <FormProvider {...form}>
          <OnboardingStack />
        </FormProvider>
      </SafeAreaView>
    </OnboardingProvider>
  )
}
