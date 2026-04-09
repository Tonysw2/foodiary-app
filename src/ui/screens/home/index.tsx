import { AppText } from '@ui/components/app-text'
import { WelcomeModal } from '@ui/components/welcome-modal'
import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Header } from './components/header'
import { styles } from './styles'

export function Home() {
  const { top } = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <WelcomeModal />

      <FlatList
        ListHeaderComponent={Header}
        data={[1, 2, 3, 4]}
        keyExtractor={(item) => String(item)}
        renderItem={() => <AppText>oi</AppText>}
      />
    </View>
  )
}
