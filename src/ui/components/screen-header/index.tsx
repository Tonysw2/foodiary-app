import { AppText } from '@ui/components/app-text'
import { StyleSheet, View } from 'react-native'

interface ScreenHeaderProps {
  title: string
  left?: React.ReactNode
  right?: React.ReactNode
}

export function ScreenHeader({ title, left, right }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.side}>{left}</View>

      <View style={styles.titleContainer}>
        <AppText weight="semiBold">{title}</AppText>
      </View>

      <View style={styles.side}>{right}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  side: {
    width: 48,
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
})
