import { useAuth } from '@app/providers/auth-provider'
import { AppText } from '@ui/components/app-text'
import { Button } from '@ui/components/button'
import { View } from 'react-native'
import { styles } from './styles'

export function Home() {
  const { signOut } = useAuth()

  return (
    <View style={styles.container}>
      <AppText style={styles.text}>Home</AppText>
      <Button onPress={signOut}>Sair</Button>
    </View>
  )
}
