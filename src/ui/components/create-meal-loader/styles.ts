import { theme } from '@ui/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.lime[900],
    gap: 24,
  },
  content: {
    alignItems: 'center',
    gap: 8,
  },
  video: {
    height: 136,
    width: 136,
    borderRadius: 68,
  },
})
