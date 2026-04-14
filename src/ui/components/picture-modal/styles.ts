import { theme } from '@ui/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black[900],
  },
  content: {
    flex: 1,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  body: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  picture: {
    flex: 1,
    width: '100%',
  },
  footer: {
    height: 112,
    marginBottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterWrapper: {
    alignItems: 'center',
    gap: 12,
  },
  previewActions: {
    flexDirection: 'row',
    gap: 32,
  },
  permissionWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    paddingHorizontal: 32,
  },
})
