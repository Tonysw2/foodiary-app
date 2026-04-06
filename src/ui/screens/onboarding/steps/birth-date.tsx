import { AppText } from '@ui/components/app-text'
import { Button } from '@ui/components/button'
import { View } from 'react-native'
import { useOnboarding } from '../contexts/onboarding-context'

export function BirthDateStep() {
  const { nextStep, previousStep } = useOnboarding()
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AppText size="3xl" weight="semiBold">
        Birth Date
      </AppText>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button onPress={previousStep}>Prev</Button>
        <Button onPress={nextStep}>Next</Button>
      </View>
    </View>
  )
}
