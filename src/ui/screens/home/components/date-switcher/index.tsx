import { AppText } from '@ui/components/app-text'
import { Button } from '@ui/components/button'
import { theme } from '@ui/styles/theme'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react-native'
import { View } from 'react-native'
import { useHomeContext } from '../../context/home-context'
import { styles } from './styles'

export function DateSwitcher() {
  const { date, isLoading, nextDay, previousDay } = useHomeContext()

  return (
    <View style={[styles.container, { opacity: isLoading ? 0.5 : 1 }]}>
      <Button
        variant="ghost"
        size="icon"
        onPress={previousDay}
        disabled={isLoading}
      >
        <ChevronLeftIcon />
      </Button>

      <AppText
        weight="medium"
        color={theme.colors.gray[700]}
        style={styles.dateText}
      >
        {formatDate(date)}
      </AppText>

      <Button
        variant="ghost"
        size="icon"
        onPress={nextDay}
        disabled={isLoading}
      >
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
