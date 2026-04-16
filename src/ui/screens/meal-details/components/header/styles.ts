import { theme } from '@ui/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black[700],
  },
  heroImage: {
    height: 212,
    width: '100%',
  },
  macrosBar: {
    height: 64,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  macrosBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  macrosBarRight: {
    flexDirection: 'row',
    gap: 8,
  },
  breakdown: {
    padding: 20,
    gap: 24,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 24,
  },
  breakdownItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  progressBar: {
    flexDirection: 'row',
    height: 4,
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  divider: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.colors.gray[400],
  },
  mealInfo: {
    gap: 24,
    padding: 20,
  },
})
