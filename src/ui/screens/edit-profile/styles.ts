import { theme } from '@ui/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    gap: 32,
  },
  content: {
    flex: 1,
    gap: 24,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  form: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 24,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[400],
  },
  footerButton: {
    flex: 1,
  },
})
