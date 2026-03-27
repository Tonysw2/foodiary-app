import {
  HostGrotesk_400Regular,
  HostGrotesk_500Medium,
  HostGrotesk_600SemiBold,
  useFonts,
} from '@expo-google-fonts/host-grotesk'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { AppText } from './components/app-text'
import { theme } from './ui/styles/theme'

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
    <View style={styles.container}>
      <AppText size="xl" weight="semiBold" style={{ textAlign: 'center' }}>
        Open up App.tsx to start working on your app!
      </AppText>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lime['500'],
    alignItems: 'center',
    justifyContent: 'center',
  },
})
