import { AppText } from '@ui/components/app-text'
import { Button } from '@ui/components/button'
import { View } from 'react-native'
import { useOnboarding } from '../contexts/onboarding-context'

export function CreateAccountStep() {
  const { previousStep } = useOnboarding()
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AppText size="3xl" weight="semiBold">
        Create Account
      </AppText>
      <Button onPress={previousStep}>Prev</Button>
    </View>
  )
}
