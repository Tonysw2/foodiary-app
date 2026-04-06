import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  step: {
    flex: 1,
  },
  stepHeader: {
    gap: 8,
    padding: 24,
  },
  stepTitle: {
    textAlign: 'center',
    letterSpacing: -0.32,
  },
  stepSubtitle: {
    textAlign: 'center',
  },
  stepContent: {
    flex: 1,
    marginVertical: 34,
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
  },
  stepFooter: {
    paddingHorizontal: 24,
  },
  contentCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
