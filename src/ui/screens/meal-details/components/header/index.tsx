import type { Meal } from '@app/types/meal'
import { AppText } from '@ui/components/app-text'
import { Button } from '@ui/components/button'
import { theme } from '@ui/styles/theme'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { ChevronLeft } from 'lucide-react-native'
import { Skeleton } from 'moti/skeleton'
import { ImageBackground, View } from 'react-native'
import { styles } from './styles'
import { useHeaderController } from './use-header-controller'

interface HeaderProps {
  meal: Meal | null
  isFetching: boolean
  onBack: () => void
}

export function Header({ meal, isFetching, onBack }: HeaderProps) {
  const { top, isPicture, summary, percentages } = useHeaderController({ meal })

  return (
    <>
      <View style={styles.container}>
        {isPicture && (
          <ImageBackground
            style={styles.heroImage}
            source={{ uri: meal?.inputFileURL }}
            resizeMode="cover"
          >
            <LinearGradient
              style={[
                { width: '100%', height: '100%', paddingHorizontal: 12 },
                { paddingTop: top + 12 },
              ]}
              colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']}
              start={{ y: 0.6, x: 0 }}
              end={{ y: 1, x: 0 }}
            >
              <BlurView
                tint="light"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  overflow: 'hidden',
                }}
              >
                <Button
                  size="icon"
                  variant="neutral"
                  rippleStyle="light"
                  onPress={onBack}
                >
                  <ChevronLeft color={theme.colors.white} size={20} />
                </Button>
              </BlurView>
            </LinearGradient>
          </ImageBackground>
        )}

        <View style={[styles.macrosBar, { marginTop: isPicture ? 0 : top }]}>
          <View
            style={[styles.macrosBarLeft, isPicture && { paddingLeft: 16 }]}
          >
            {!isPicture && (
              <Button
                size="icon"
                variant="ghost"
                rippleStyle="light"
                onPress={onBack}
              >
                <ChevronLeft color={theme.colors.white} size={20} />
              </Button>
            )}
            <AppText color={theme.colors.white} weight="medium">
              Macros totais
            </AppText>
          </View>
          <View style={styles.macrosBarRight}>
            <AppText color={theme.colors.gray[300]}>Calorias</AppText>
            {isFetching ? (
              <Skeleton colorMode="dark" width={72} height={24} />
            ) : (
              <AppText color={theme.colors.white} weight="medium">
                {summary.calories}kcal
              </AppText>
            )}
          </View>
        </View>
      </View>

      <View style={styles.breakdown}>
        <View style={styles.breakdownRow}>
          <View style={styles.breakdownItem}>
            <AppText color={theme.colors.gray[700]}>Carboidratos</AppText>
            {isFetching ? (
              <Skeleton colorMode="light" width={96} height={24} />
            ) : (
              <AppText weight="medium" color={theme.colors.support.yellow}>
                {summary.carbohydrates}g ({percentages.carbPercentage}%)
              </AppText>
            )}
          </View>
          <View style={styles.breakdownItem}>
            <AppText color={theme.colors.gray[700]}>Proteínas</AppText>
            {isFetching ? (
              <Skeleton colorMode="light" width={96} height={24} />
            ) : (
              <AppText weight="medium" color={theme.colors.support.green}>
                {summary.proteins}g ({percentages.protPercentage}%)
              </AppText>
            )}
          </View>
          <View style={styles.breakdownItem}>
            <AppText color={theme.colors.gray[700]}>Gorduras</AppText>
            {isFetching ? (
              <Skeleton colorMode="light" width={96} height={24} />
            ) : (
              <AppText weight="medium" color={theme.colors.support.orange}>
                {summary.fats}g ({percentages.fatPercentage}%)
              </AppText>
            )}
          </View>
        </View>
        {isFetching ? (
          <Skeleton show colorMode="light" width="100%" height={4} />
        ) : (
          <View style={styles.progressBar}>
            <View
              style={{
                width: `${percentages.carbPercentage}%`,
                backgroundColor: theme.colors.support.yellow,
              }}
            />
            <View
              style={{
                width: `${percentages.protPercentage}%`,
                backgroundColor: theme.colors.support.green,
              }}
            />
            <View
              style={{
                width: `${percentages.fatPercentage}%`,
                backgroundColor: theme.colors.support.orange,
              }}
            />
          </View>
        )}
      </View>

      <View style={styles.divider} />

      <View style={styles.mealInfo}>
        {isFetching ? (
          <Skeleton colorMode="light" width={180} height={36} />
        ) : (
          <AppText weight="semiBold" size="2xl">
            {meal?.name ?? ''}
          </AppText>
        )}
        <AppText weight="medium" color={theme.colors.gray[700]}>
          Itens
        </AppText>
      </View>
    </>
  )
}
