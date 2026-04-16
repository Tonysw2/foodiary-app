import { AppText } from '@ui/components/app-text'
import { theme } from '@ui/styles/theme'
import { FlatList, StatusBar, View } from 'react-native'
import { Header } from './components/header'
import { styles } from './styles'
import { useMealDetailsController } from './use-meal-details-controller'

export function MealDetails() {
  const { meal, goBack } = useMealDetailsController()

  return (
    <View style={styles.container}>
      <StatusBar animated translucent barStyle="light-content" />

      <FlatList
        bounces={false}
        data={meal?.foods ?? []}
        ListHeaderComponent={<Header meal={meal ?? null} onBack={goBack} />}
        renderItem={({ item }) => (
          <View
            style={{
              marginHorizontal: 20,
              padding: 14,
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.gray[400],
            }}
          >
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
