import { NavigationContainer } from '@react-navigation/native'
import { AuthStack } from './auth-stack'

export function RootNavigator() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  )
}
