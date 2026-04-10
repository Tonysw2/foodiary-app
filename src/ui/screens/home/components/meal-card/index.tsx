import type { Meal } from '@app/types/meal'
import { AppText } from '@ui/components/app-text'
import { theme } from '@ui/styles/theme'
import { useMemo } from 'react'
import { Platform, Pressable, View } from 'react-native'
import { useHomeContext } from '../../context/home-context'
import { styles } from './styles'

function formatDate(date: string) {
  return new Date(date)
    .toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(':', 'h')
}

interface MealCardProps {
  meal: Meal
}

export function MealCard({ meal }: MealCardProps) {
  const { isLoading } = useHomeContext()

  const foodsLabel = useMemo(
    () => meal.foods.map((f) => f.name).join(', '),
    [meal.foods],
  )

  const summary = useMemo(
    () =>
      meal.foods.reduce(
        (acc, f) => ({
          calories: acc.calories + f.calories,
          proteins: acc.proteins + f.proteins,
          carbohydrates: acc.carbohydrates + f.carbohydrates,
          fats: acc.fats + f.fats,
        }),
        {
          calories: 0,
          proteins: 0,
          carbohydrates: 0,
          fats: 0,
        },
      ),
    [meal.foods],
  )

  return (
    <View style={[styles.container, { opacity: isLoading ? 0.5 : 1 }]}>
      <AppText color={theme.colors.gray[700]}>
        {formatDate(meal.createdAt)}
      </AppText>

      <View style={styles.wrapper}>
        <Pressable
          disabled={isLoading}
          android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', foreground: true }}
          style={({ pressed }) => [
            styles.card,
            (isLoading || (pressed && Platform.OS === 'ios')) && {
              opacity: 0.5,
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <View style={styles.icon}>
              <AppText>{meal.icon}</AppText>
            </View>

            <View style={styles.cardHeaderInfo}>
              <AppText size="sm" color={theme.colors.gray[700]}>
                {meal.name}
              </AppText>
              <AppText weight="medium" numberOfLines={1}>
                {foodsLabel}
              </AppText>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <AppText weight="medium" color={theme.colors.support.tomato}>
                  {summary.calories}
                </AppText>
                <AppText color={theme.colors.gray[700]}>Kcal</AppText>
              </View>
              <View style={styles.cardContentItem}>
                <AppText weight="medium" color={theme.colors.support.green}>
                  {summary.proteins}g
                </AppText>
                <AppText color={theme.colors.gray[700]}>Proteínas</AppText>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <AppText weight="medium" color={theme.colors.support.yellow}>
                  {summary.carbohydrates}g
                </AppText>
                <AppText color={theme.colors.gray[700]}>Carboidratos</AppText>
              </View>
              <View style={styles.cardContentItem}>
                <AppText weight="medium" color={theme.colors.support.orange}>
                  {summary.fats}g
                </AppText>
                <AppText color={theme.colors.gray[700]}>Gorduras</AppText>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  )
}
