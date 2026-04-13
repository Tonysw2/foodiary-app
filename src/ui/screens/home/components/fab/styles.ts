import { theme } from '@ui/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    borderRadius: 28,
  },
  bottomSheetModal: {
    shadowColor: theme.colors.black[900],
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.58,
    shadowRadius: 16,
    elevation: 24,
  },
  content: {
    paddingHorizontal: 24,
    gap: 24,
  },
})
