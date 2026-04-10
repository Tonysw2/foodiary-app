import { AppText } from '@ui/components/app-text'
import { View } from 'react-native'
import { CurrentGoal } from '../current-goal'
import { DateSwitcher } from '../date-switcher'
import { UserHeader } from '../user-header'
import { styles } from './styles'

export function Header() {
  return (
    <View>
      <UserHeader />

      <View style={styles.container}>
        <DateSwitcher />
        <CurrentGoal />

        <View style={styles.divider} />

        <AppText weight="medium" style={styles.mealsLabel}>
          REFEIÇÕES
        </AppText>
      </View>
    </View>
  )
}
