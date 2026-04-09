import { theme } from '@ui/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lime[900],
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 36,
  },
  header: {
    alignItems: 'center',
  },
  headerContent: {
    maxWidth: 327,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 56,
    width: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
})
