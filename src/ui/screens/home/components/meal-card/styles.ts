import { theme } from '@ui/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 8,
  },
  wrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  card: {
    borderWidth: 1,
    padding: 8,
    gap: 8,
    borderRadius: 16,
    borderColor: theme.colors.gray[400],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  icon: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeaderInfo: {
    gap: 2,
    flexShrink: 1,
  },
  cardContent: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: theme.colors.gray[100],
    borderRadius: 8,
    gap: 16,
  },
  cardContentRow: {
    flexDirection: 'row',
  },
  cardContentItem: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
})
