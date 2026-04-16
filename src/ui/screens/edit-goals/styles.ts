import { theme } from '@ui/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  form: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: theme.colors.gray[400],
  },
  footerButton: {
    flex: 1,
  },
})
