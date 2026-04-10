import { getAccountQueryOptions } from '@app/lib/query-options/get-account-query-options'
import { useQuery } from '@tanstack/react-query'
import { AppText } from '@ui/components/app-text'
import { Button } from '@ui/components/button'
import { theme } from '@ui/styles/theme'
import { TargetIcon } from 'lucide-react-native'
import { Image, View } from 'react-native'
import { styles } from './styles'

export function UserHeader() {
  const { data: account } = useQuery(getAccountQueryOptions())

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: 'https://github.com/tonysw2.png' }}
          style={styles.avatar}
        />

        <View style={styles.greetings}>
          <AppText size="sm" color={theme.colors.gray[700]}>
            Olá 👋🏼
          </AppText>
          <AppText weight="semiBold">{account?.profile.name}</AppText>
        </View>
      </View>

      <Button variant="ghost" leftIcon={TargetIcon}>
        Metas
      </Button>
    </View>
  )
}
