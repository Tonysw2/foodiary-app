import { getMealsQueryOptions } from '@app/lib/query-options/get-meals-query-options'
import { useQuery } from '@tanstack/react-query'
import { WelcomeModal } from '@ui/components/welcome-modal'
import { theme } from '@ui/styles/theme'
import { useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { EmptyState } from './components/empty-state'
import { FullScreenLoader } from './components/full-screen-loader'
import { Header } from './components/header'
import { ItemSeparatorComponent } from './components/item-separator-component'
import { MealCard } from './components/meal-card'
import { styles } from './styles'

export function Home() {
  const { top, bottom } = useSafeAreaInsets()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const {
    data,
    refetch: fetchMeals,
    isLoading,
  } = useQuery(getMealsQueryOptions(new Date()))

  async function handleRefresh() {
    setIsRefreshing(true)
    await fetchMeals()
    setIsRefreshing(false)
  }

  if (isLoading) {
    return <FullScreenLoader />
  }

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <WelcomeModal />

      <FlatList
        data={data?.meals ?? []}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.lime[900]}
            colors={[theme.colors.lime[700]]}
          />
        }
        keyExtractor={(meal) => meal.id}
        renderItem={({ item }) => <MealCard meal={item} />}
        contentContainerStyle={[styles.content, { paddingBottom: bottom + 24 }]}
        ListHeaderComponent={Header}
        ListEmptyComponent={EmptyState}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  )
}
