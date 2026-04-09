import { getAccountQueryOptions } from '@app/lib/query-options/get-account-query-options'
import { useAuth } from '@app/providers/auth-provider'
import { Goal } from '@app/types/goal'
import { useQuery } from '@tanstack/react-query'
import { theme } from '@ui/styles/theme'
import { useState } from 'react'
import { Modal, StatusBar, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { AppText } from '../app-text'
import { Button } from '../button'
import { GoalStats } from '../goal-stats'
import { styles } from './styles'

const goalMap: Record<Goal, { icon: string; label: string }> = {
  [Goal.LOSE]: { icon: '🔥', label: 'Perder Peso' },
  [Goal.MAINTAIN]: { icon: '⚖️', label: 'Manter Peso' },
  [Goal.GAIN]: { icon: '💪', label: 'Ganhar Massa' },
}

export function WelcomeModal() {
  const { signedUp } = useAuth()
  const { data: account } = useQuery(getAccountQueryOptions())
  const [isVisible, setIsVisible] = useState(signedUp)

  function handleCloseModal() {
    setIsVisible(false)
  }

  return (
    <Modal
      visible={isVisible}
      transparent
      statusBarTranslucent
      animationType="fade"
      style={styles.container}
      onRequestClose={handleCloseModal}
    >
      <StatusBar animated barStyle="light-content" />
      <View style={styles.container}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.content}>
              <View style={styles.header}>
                <View style={styles.icon}>
                  <AppText>{goalMap[account!.profile.goal].icon}</AppText>
                </View>
                <View style={styles.headerContent}>
                  <AppText
                    size="3xl"
                    align="center"
                    weight="semiBold"
                    color={theme.colors.gray[100]}
                    style={{ maxWidth: 300 }}
                  >
                    Seu plano de dieta para{' '}
                    <Text style={{ color: theme.colors.lime[400] }}>
                      {goalMap[account!.profile.goal].label}
                    </Text>{' '}
                    está pronto!
                  </AppText>
                  <AppText color={theme.colors.gray[600]} align="center">
                    Essa é a recomendação diária recomendada para seu plano.
                    Fique tranquilo, você poderá editar depois caso deseje.
                  </AppText>
                </View>
              </View>
              <GoalStats
                calories={{ goal: account!.goal.calories }}
                carbohydrates={{ goal: account!.goal.carbohydrates }}
                fats={{ goal: account!.goal.fats }}
                proteins={{ goal: account!.goal.proteins }}
              />
            </View>
            <View style={styles.footer}>
              <Button onPress={handleCloseModal}>Começar meu plano</Button>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </View>
    </Modal>
  )
}
