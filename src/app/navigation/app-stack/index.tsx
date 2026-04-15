import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '@ui/screens/home'
import { MealDetails } from '@ui/screens/meal-details'
import type { AppStackParamList } from './types'

const Stack = createNativeStackNavigator<AppStackParamList>()

export function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MealDetails" component={MealDetails} />
    </Stack.Navigator>
  )
}
