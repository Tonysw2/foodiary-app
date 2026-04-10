import { AppText } from '@ui/components/app-text'
import { CreateMealOptions } from '@ui/components/create-meal-options'
import { theme } from '@ui/styles/theme'
import { View } from 'react-native'
import { styles } from './styles'

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
