import { theme } from '@ui/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  containerHorizontal: {
    flexDirection: 'row',
    gap: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.gray[400],
  },
  itemHorizontal: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemSelected: {
    borderColor: theme.colors.lime[700],
    backgroundColor: theme.colors.lime['700/10'],
  },
  itemDisabled: {
    opacity: 0.5,
  },
  itemContent: {
    flex: 1,
    gap: 2,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: theme.colors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWithBg: {
    backgroundColor: theme.colors['white/40'],
  },
  label: {
    letterSpacing: -0.32,
  },
  textCenter: {
    textAlign: 'center',
  },
  itemInfo: {
    gap: 2,
  },
})
