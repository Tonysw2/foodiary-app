import { theme } from '@ui/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 20,
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    height: 56,
    width: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealHeaderInfo: {
    gap: 4,
    flexShrink: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
  },
  badgePending: {
    backgroundColor: theme.colors.gray[300],
  },
  badgeProcessing: {
    backgroundColor: theme.colors.gray[300],
  },
  badgeSuccess: {
    backgroundColor: theme.colors['lime']['600/10'],
  },
  badgeFailed: {
    backgroundColor: theme.colors.support['red/10'],
  },
  section: {
    gap: 12,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.gray[400],
  },
  foodItem: {
    borderWidth: 1,
    borderColor: theme.colors.gray[400],
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  foodItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodMacrosRow: {
    flexDirection: 'row',
  },
  foodMacroItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  summary: {
    backgroundColor: theme.colors.gray[100],
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  summaryRow: {
    flexDirection: 'row',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
})
