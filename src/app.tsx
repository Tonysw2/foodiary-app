import {
  HostGrotesk_400Regular,
  HostGrotesk_500Medium,
  HostGrotesk_600SemiBold,
  useFonts,
} from '@expo-google-fonts/host-grotesk'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Greetings } from './ui/screens/greetings'

export function App() {
  const [fontsLoaded] = useFonts({
    HostGrotesk_400Regular,
    HostGrotesk_500Medium,
    HostGrotesk_600SemiBold,
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <Greetings />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
