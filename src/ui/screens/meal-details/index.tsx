import type { MealStatus } from '@app/types/meal'
import { AppText } from '@ui/components/app-text'
import { theme } from '@ui/styles/theme'
import { useMemo } from 'react'
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native'
import { styles } from './styles'
import { useMealDetailsController } from './use-meal-details-controller'

const STATUS_LABEL: Record<MealStatus, string> = {
  PENDING: 'Pendente',
  QUEUED: 'Na fila',
  PROCESSING: 'Processando',
  SUCCESS: 'Concluído',
  FAILED: 'Falhou',
}

const INPUT_TYPE_LABEL = {
  PICTURE: 'Foto',
  AUDIO: 'Áudio',
}

function statusBadgeStyle(status: MealStatus) {
  switch (status) {
    case 'SUCCESS':
      return styles.badgeSuccess
    case 'FAILED':
      return styles.badgeFailed
    default:
      return styles.badgePending
  }
}

function statusTextColor(status: MealStatus) {
  switch (status) {
    case 'SUCCESS':
      return theme.colors.lime[700]
    case 'FAILED':
      return theme.colors.support.red
    default:
      return theme.colors.gray[700]
  }
}

export function MealDetails() {
  const { top, meal, isLoading, goBack } = useMealDetailsController()

  const summary = useMemo(
    () =>
      (meal?.foods ?? []).reduce(
        (acc, f) => ({
          calories: acc.calories + f.calories,
          proteins: acc.proteins + f.proteins,
          carbohydrates: acc.carbohydrates + f.carbohydrates,
          fats: acc.fats + f.fats,
        }),
        { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 },
      ),
    [meal?.foods],
  )

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View style={styles.header}>
        <Pressable onPress={goBack} style={styles.backButton}>
          <AppText size="lg" weight="medium">
            ←
          </AppText>
        </Pressable>
        <AppText size="lg" weight="semiBold">
          Detalhes da refeição
        </AppText>
      </View>

      {isLoading && !meal ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator color={theme.colors.lime[700]} />
        </View>
      ) : meal ? (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mealHeader}>
            <View style={styles.icon}>
              <AppText size="xl">{meal.icon}</AppText>
            </View>
            <View style={styles.mealHeaderInfo}>
              <AppText size="sm" color={theme.colors.gray[700]}>
                {INPUT_TYPE_LABEL[meal.inputType]}
              </AppText>
              <AppText size="lg" weight="semiBold" numberOfLines={2}>
                {meal.name}
              </AppText>
              <View style={[styles.badge, statusBadgeStyle(meal.status)]}>
                <AppText
                  size="xs"
                  weight="medium"
                  color={statusTextColor(meal.status)}
                >
                  {meal.status === 'PROCESSING' || meal.status === 'QUEUED'
                    ? `${STATUS_LABEL[meal.status]}...`
                    : STATUS_LABEL[meal.status]}
                </AppText>
              </View>
            </View>
          </View>

          {meal.foods.length > 0 && (
            <View style={styles.section}>
              <AppText weight="semiBold">Alimentos</AppText>
              {meal.foods.map((food, index) => (
                <View key={index.toString()} style={styles.foodItem}>
                  <View style={styles.foodItemHeader}>
                    <AppText weight="medium">{food.name}</AppText>
                    <AppText size="sm" color={theme.colors.gray[700]}>
                      {food.quantity}
                    </AppText>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.foodMacrosRow}>
                    <View style={styles.foodMacroItem}>
                      <AppText
                        weight="medium"
                        color={theme.colors.support.tomato}
                      >
                        {food.calories}
                      </AppText>
                      <AppText size="xs" color={theme.colors.gray[700]}>
                        Kcal
                      </AppText>
                    </View>
                    <View style={styles.foodMacroItem}>
                      <AppText
                        weight="medium"
                        color={theme.colors.support.green}
                      >
                        {food.proteins}g
                      </AppText>
                      <AppText size="xs" color={theme.colors.gray[700]}>
                        Proteínas
                      </AppText>
                    </View>
                    <View style={styles.foodMacroItem}>
                      <AppText
                        weight="medium"
                        color={theme.colors.support.yellow}
                      >
                        {food.carbohydrates}g
                      </AppText>
                      <AppText size="xs" color={theme.colors.gray[700]}>
                        Carboidratos
                      </AppText>
                    </View>
                    <View style={styles.foodMacroItem}>
                      <AppText
                        weight="medium"
                        color={theme.colors.support.orange}
                      >
                        {food.fats}g
                      </AppText>
                      <AppText size="xs" color={theme.colors.gray[700]}>
                        Gorduras
                      </AppText>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          {meal.foods.length > 1 && (
            <View style={styles.section}>
              <AppText weight="semiBold">Total</AppText>
              <View style={styles.summary}>
                <View style={styles.summaryRow}>
                  <View style={styles.summaryItem}>
                    <AppText
                      weight="medium"
                      color={theme.colors.support.tomato}
                    >
                      {summary.calories}
                    </AppText>
                    <AppText size="sm" color={theme.colors.gray[700]}>
                      Kcal
                    </AppText>
                  </View>
                  <View style={styles.summaryItem}>
                    <AppText weight="medium" color={theme.colors.support.green}>
                      {summary.proteins}g
                    </AppText>
                    <AppText size="sm" color={theme.colors.gray[700]}>
                      Proteínas
                    </AppText>
                  </View>
                </View>
                <View style={styles.summaryRow}>
                  <View style={styles.summaryItem}>
                    <AppText
                      weight="medium"
                      color={theme.colors.support.yellow}
                    >
                      {summary.carbohydrates}g
                    </AppText>
                    <AppText size="sm" color={theme.colors.gray[700]}>
                      Carboidratos
                    </AppText>
                  </View>
                  <View style={styles.summaryItem}>
                    <AppText
                      weight="medium"
                      color={theme.colors.support.orange}
                    >
                      {summary.fats}g
                    </AppText>
                    <AppText size="sm" color={theme.colors.gray[700]}>
                      Gorduras
                    </AppText>
                  </View>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      ) : null}
    </View>
  )
}
