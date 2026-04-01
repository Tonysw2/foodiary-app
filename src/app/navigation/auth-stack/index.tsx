import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppText } from '@ui/components/app-text'
import { Greetings } from '@ui/screens/greetings'
import { View } from 'react-native'
import type { AuthStackParamList } from './types'

const Stack = createNativeStackNavigator<AuthStackParamList>()

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Greetings" component={Greetings} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  )
}

function Onboarding() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AppText size="3xl" weight="semiBold">
        Onboarding
      </AppText>
    </View>
  )
}
