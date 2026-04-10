import type { Meal } from '@app/types/meal'
import { AppText } from '@ui/components/app-text'
import { theme } from '@ui/styles/theme'
import { useMemo } from 'react'
import { Platform, Pressable, StyleSheet, View } from 'react-native'

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
    <View style={styles.container}>
      <AppText color={theme.colors.gray[700]}>
        {formatDate(meal.createdAt)}
      </AppText>

      <View style={styles.wrapper}>
        <Pressable
          android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', foreground: true }}
          style={({ pressed }) => [
            styles.card,
            pressed && Platform.OS === 'ios' && { opacity: 0.5 },
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 8,
  },
  wrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  card: {
    borderWidth: 1,
    padding: 8,
    gap: 8,
    borderRadius: 16,
    borderColor: theme.colors.gray[400],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  icon: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeaderInfo: {
    gap: 2,
    flexShrink: 1,
  },
  cardContent: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: theme.colors.gray[100],
    borderRadius: 8,
    gap: 16,
  },
  cardContentRow: {
    flexDirection: 'row',
  },
  cardContentItem: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
})
