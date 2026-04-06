import { AppText } from '@ui/components/app-text'
import { Button } from '@ui/components/button'
import { View } from 'react-native'
import { useOnboarding } from '../contexts/onboarding-context'

export function GoalStep() {
  const { nextStep } = useOnboarding()
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AppText size="3xl" weight="semiBold">
        Goal
      </AppText>
      <Button onPress={nextStep}>Next</Button>
    </View>
  )
}
