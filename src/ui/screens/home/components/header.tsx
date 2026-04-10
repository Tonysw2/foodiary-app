import { AppText } from '@ui/components/app-text'
import { theme } from '@ui/styles/theme'
import { StyleSheet, View } from 'react-native'
import { CurrentGoal } from './current-goal'
import { DateSwitcher } from './date-switcher'
import { UserHeader } from './user-header'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginTop: -16,
  },
  divider: {
    backgroundColor: theme.colors.gray[200],
    width: '100%',
    height: 1,
    marginTop: 12,
    marginBottom: 20,
  },
})

export function Header() {
  return (
    <View>
      <UserHeader />

      <View style={styles.container}>
        <DateSwitcher />
        <CurrentGoal />

        <View style={styles.divider} />

        <AppText
          weight="medium"
          style={{ letterSpacing: 1.28, paddingHorizontal: 12 }}
        >
          REFEIÇÕES
        </AppText>
      </View>
    </View>
  )
}
