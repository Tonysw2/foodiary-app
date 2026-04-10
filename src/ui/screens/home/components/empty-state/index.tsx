import { AppText } from '@ui/components/app-text'
import { CreateMealOptions } from '@ui/components/create-meal-options'
import { theme } from '@ui/styles/theme'
import { View } from 'react-native'
import { useHomeContext } from '../../context/home-context'
import { styles } from './styles'

export function EmptyState() {
  const { isLoading } = useHomeContext()

  return (
    <View style={[styles.container, { opacity: isLoading ? 0.5 : 1 }]}>
      <AppText color={theme.colors.gray[700]}>
        Cadastre sua primeira refeição através de uma das opções abaixo:
      </AppText>
      <CreateMealOptions disabled={isLoading} />
    </View>
  )
}
