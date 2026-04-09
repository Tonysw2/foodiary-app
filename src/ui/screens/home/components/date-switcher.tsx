import { AppText } from '@ui/components/app-text'
import { Button } from '@ui/components/button'
import { theme } from '@ui/styles/theme'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react-native'
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

export function DateSwitcher() {
  return (
    <View style={styles.container}>
      <Button variant="ghost" size="icon">
        <ChevronLeftIcon />
      </Button>

      <AppText
        weight="medium"
        color={theme.colors.gray[700]}
        style={{ letterSpacing: 1.28 }}
      >
        {formatDate(new Date())}
      </AppText>

      <Button variant="ghost" size="icon">
        <ChevronRightIcon />
      </Button>
    </View>
  )
}

function formatDate(date: Date) {
  const now = new Date()
  const isToday = now.toDateString() === date.toDateString()

  const formattedDate = Intl.DateTimeFormat('pt-br', {
    weekday: isToday ? undefined : 'long',
    day: '2-digit',
    month: 'long',
  }).format(date)

  return `${isToday ? 'HOJE, ' : ''}${formattedDate}`.toUpperCase()
}
