import { Logo } from '@ui/components/logo'
import { theme } from '@ui/styles/theme'
import { ActivityIndicator, View } from 'react-native'
import { styles } from './styles'

export function FullScreenLoader() {
  return (
    <View style={styles.container}>
      <Logo />
      <ActivityIndicator size="small" color={theme.colors.white} />
    </View>
  )
}
