import { useNavigation } from '@react-navigation/native'
import { orderedSteps } from '@ui/screens/onboarding/steps/ordered-steps'
import { useCallback, useState } from 'react'
import { onboardingNavigationRef } from '../onboarding-stack'
import { OnboardingContext } from './onboarding-context'

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const navigation = useNavigation()
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextStep = useCallback(() => {
    const nextStepIndex = currentIndex + 1
    const nextStep = orderedSteps[nextStepIndex]

    if (!nextStep) {
      return
    }

    setCurrentIndex(nextStepIndex)

    onboardingNavigationRef.navigate(nextStep)
  }, [currentIndex])

  const previousStep = useCallback(() => {
    const previousStepIndex = currentIndex - 1
    const previousStep = orderedSteps[previousStepIndex]

    if (!previousStep) {
      navigation.goBack()
      return
    }

    setCurrentIndex(previousStepIndex)

    onboardingNavigationRef.goBack()
  }, [currentIndex, navigation.goBack])

  return (
    <OnboardingContext.Provider
      value={{ currentIndex, nextStep, previousStep }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}
