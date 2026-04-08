import { AuthProvider } from '@app/providers/auth-provider'
import { TanstackQueryProvider } from '@app/providers/tanstack-query-provider'
import {
  HostGrotesk_400Regular,
  HostGrotesk_500Medium,
  HostGrotesk_600SemiBold,
  useFonts,
} from '@expo-google-fonts/host-grotesk'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RootNavigator } from './app/navigation'

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <TanstackQueryProvider>
            <AuthProvider>
              <RootNavigator />
            </AuthProvider>
          </TanstackQueryProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
