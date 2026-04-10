import { AppText } from '@ui/components/app-text'
import { CreateMealOptions } from '@ui/components/create-meal-options'
import { theme } from '@ui/styles/theme'
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 16,
  },
})

export function EmptyState() {
  return (
    <View style={styles.container}>
      <AppText color={theme.colors.gray[700]}>
        Cadastre sua primeira refeição através de uma das opções abaixo:
      </AppText>
      <CreateMealOptions />
    </View>
  )
}
