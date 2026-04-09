import { theme } from '@ui/styles/theme'
import { StyleSheet, View } from 'react-native'
import { UserHeader } from './user-header'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lime[400],
  },
})

export function Header() {
  return (
    <View>
      <UserHeader />
    </View>
  )
}
