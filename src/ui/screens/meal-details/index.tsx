import { AppText } from '@ui/components/app-text'
import { Skeleton } from 'moti/skeleton'
import { FlatList, StatusBar, View } from 'react-native'
import { Header } from './components/header'
import { styles } from './styles'
import { useMealDetailsController } from './use-meal-details-controller'

export function MealDetails() {
  const { meal, isFetching, goBack } = useMealDetailsController()

  return (
    <View style={styles.container}>
      <StatusBar animated translucent barStyle="light-content" />

      <FlatList
        bounces={false}
        data={meal?.foods ?? []}
        ListHeaderComponent={
          <Header meal={meal ?? null} isFetching={isFetching} onBack={goBack} />
        }
        ListEmptyComponent={
          isFetching ? (
            <>
              <View style={styles.foodItem}>
                <Skeleton width={'100%'} height={24} colorMode="light" />
              </View>
              <View style={styles.foodItem}>
                <Skeleton width={'100%'} height={24} colorMode="light" />
              </View>
              <View style={styles.foodItem}>
                <Skeleton width={'100%'} height={24} colorMode="light" />
              </View>
            </>
          ) : null
        }
        renderItem={({ item }) => (
          <View style={styles.foodItem}>
            <AppText>
              {item.quantity} {item.name}
            </AppText>
          </View>
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  )
}
