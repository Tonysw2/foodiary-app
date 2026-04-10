import { theme } from '@ui/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
  },
  buttonWrapper: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  button: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 16,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.gray[200],
  },
})
