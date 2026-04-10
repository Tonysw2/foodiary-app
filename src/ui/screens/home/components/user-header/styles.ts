import { theme } from '@ui/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 16,
    backgroundColor: theme.colors.lime[400],
    paddingBottom: 30,
  },
  userInfo: {
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  greetings: {
    gap: 2,
  },
})
