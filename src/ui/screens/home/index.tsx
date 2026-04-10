import { WelcomeModal } from '@ui/components/welcome-modal'
import { theme } from '@ui/styles/theme'
import { useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { EmptyState } from './components/empty-state'
import { Header } from './components/header'
import { ItemSeparatorComponent } from './components/item-separator-component'
import { MealCard } from './components/meal-card'
import { styles } from './styles'

export function Home() {
  const { top, bottom } = useSafeAreaInsets()

  const [isRefreshing, setIsRefreshing] = useState(false)

  async function handleRefresh() {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <WelcomeModal />

      <FlatList
        data={[1, 2, 3]}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.lime[900]}
            colors={[theme.colors.lime[700]]}
          />
        }
        keyExtractor={(item) => String(item)}
        renderItem={() => <MealCard />}
        contentContainerStyle={[styles.content, { paddingBottom: bottom + 24 }]}
        ListHeaderComponent={Header}
        ListEmptyComponent={EmptyState}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  )
}
