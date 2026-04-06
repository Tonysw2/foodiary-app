import { theme } from '@ui/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },

  progressBarBackground: {
    backgroundColor: theme.colors.gray[200],
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  progressBarForeground: {
    backgroundColor: theme.colors.lime[700],
    flex: 1,
    height: '100%',
    width: '50%',
    borderRadius: 2,
  },

  rightActionPlaceholder: {
    height: 40,
    width: 40,
  },
})
