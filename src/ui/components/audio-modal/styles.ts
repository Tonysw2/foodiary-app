import { theme } from '@ui/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black[800],
  },
  header: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
  },
  body: {
    flex: 1,
    gap: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle1: {
    borderWidth: 1,
    width: 265,
    height: 265,
    borderRadius: '100%',
    borderColor: theme.colors.gray['700/10'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle1Recording: {
    borderColor: theme.colors.lime['600/10'],
  },
  circle2: {
    borderWidth: 1,
    width: 227,
    height: 227,
    borderRadius: '100%',
    borderColor: theme.colors.gray['700/50'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle2Recording: {
    borderColor: theme.colors.lime['600/50'],
  },
  circle3: {
    borderWidth: 1,
    width: 179,
    height: 179,
    borderRadius: '100%',
    backgroundColor: theme.colors.gray['700/10'],
  },
  circle3Recording: {
    backgroundColor: theme.colors.lime['600/10'],
  },
  instructionsLabel: {
    maxWidth: 192,
    textAlign: 'center',
  },
  footer: {
    height: 112,
    marginBottom: 80,
  },
  actionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
})
