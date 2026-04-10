import { WelcomeModal } from '@ui/components/welcome-modal'
import { theme } from '@ui/styles/theme'
import { FlatList, RefreshControl, View } from 'react-native'
import { EmptyState } from './components/empty-state'
import { FullScreenLoader } from './components/full-screen-loader'
import { Header } from './components/header'
import { ItemSeparatorComponent } from './components/item-separator-component'
import { MealCard } from './components/meal-card'
import { HomeProvider } from './context/home-context'
import { styles } from './styles'
import { useHomeController } from './use-home-controller'

export function Home() {
  const {
    top,
    bottom,
    date,
    data,
    isLoading,
    isFetching,
    isRefetching,
    nextDay,
    previousDay,
    refetchMeals,
    handleRefresh,
  } = useHomeController()

  if (isLoading) {
    return <FullScreenLoader />
  }

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <WelcomeModal />

      <HomeProvider
        date={date}
        meals={data?.meals ?? []}
        isLoading={isFetching}
        nextDay={nextDay}
        previousDay={previousDay}
        refetchMeals={refetchMeals}
      >
        <FlatList
          data={data?.meals}
          keyExtractor={(meal) => meal.id}
          contentContainerStyle={[
            styles.content,
            { paddingBottom: bottom + 24 },
          ]}
          ListHeaderComponent={Header}
          ListEmptyComponent={EmptyState}
          ItemSeparatorComponent={ItemSeparatorComponent}
          renderItem={({ item }) => <MealCard meal={item} />}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={handleRefresh}
              tintColor={theme.colors.lime[900]}
              colors={[theme.colors.lime[700]]}
            />
          }
        />
      </HomeProvider>
    </View>
  )
}
