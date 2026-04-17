import { getAccountQueryOptions } from '@app/lib/query-options/get-account-query-options'
import type { AppStackParamList } from '@app/navigation/app-stack/types'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useQuery } from '@tanstack/react-query'
import { AppText } from '@ui/components/app-text'
import { Button } from '@ui/components/button'
import { theme } from '@ui/styles/theme'
import { TargetIcon } from 'lucide-react-native'
import { Image, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'

export function UserHeader() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const { data: account } = useQuery(getAccountQueryOptions())

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.userInfo}
        onPress={() => navigation.navigate('EditProfile')}
      >
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
      </TouchableOpacity>

      <Button
        variant="ghost"
        leftIcon={TargetIcon}
        onPress={() => navigation.navigate('EditGoals')}
      >
        Metas
      </Button>
    </View>
  )
}
