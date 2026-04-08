import { useAuth } from '@app/providers/auth-provider'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStack } from './app-stack'
import { AuthStack } from './auth-stack'

type RootStackParamList = {
  App: undefined
  Auth: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootNavigator() {
  const { signedIn } = useAuth()

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {signedIn ? (
          <Stack.Screen name="App" component={AppStack} />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ animationTypeForReplace: 'pop' }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
