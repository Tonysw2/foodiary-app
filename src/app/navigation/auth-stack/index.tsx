import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Greetings } from '@ui/screens/greetings'
import { Onboarding } from '@ui/screens/onboarding'
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
