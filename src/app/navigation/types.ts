import type { AuthStackParamList } from './auth-stack/types'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthStackParamList {}
  }
}
