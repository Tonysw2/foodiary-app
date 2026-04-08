import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '@ui/screens/home'
import type { AppStackParamList } from './types'

const Stack = createNativeStackNavigator<AppStackParamList>()

export function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}
