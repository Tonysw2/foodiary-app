import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  heading: {
    letterSpacing: -0.32,
    textAlign: 'center',
    maxWidth: 311,
  },
  ctaContainer: {
    width: '100%',
    alignItems: 'center',
  },
  ctaContent: {
    padding: 20,
    marginTop: 24,
    width: '100%',
  },
  signInContainer: {
    flexDirection: 'row',
    gap: 2,
    paddingVertical: 14,
    justifyContent: 'center',
  },
  fade: {
    ...StyleSheet.absoluteFillObject,
  },
})
