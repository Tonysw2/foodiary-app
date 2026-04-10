import { AppText } from '@ui/components/app-text'
import { theme } from '@ui/styles/theme'
import { Platform, Pressable, StyleSheet, View } from 'react-native'

export function MealCard() {
  return (
    <View style={styles.container}>
      <AppText color={theme.colors.gray[700]}>12h15</AppText>

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
              <AppText>🥦</AppText>
            </View>

            <View style={styles.cardHeaderInfo}>
              <AppText size="sm" color={theme.colors.gray[700]}>
                Café da manhã
              </AppText>
              <AppText weight="medium" numberOfLines={1}>
                Pão, manteiga e café
              </AppText>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <AppText weight="medium" color={theme.colors.support.tomato}>
                  210
                </AppText>
                <AppText color={theme.colors.gray[700]}>Kcal</AppText>
              </View>
              <View style={styles.cardContentItem}>
                <AppText weight="medium" color={theme.colors.support.green}>
                  210g
                </AppText>
                <AppText color={theme.colors.gray[700]}>Proteínas</AppText>
              </View>
            </View>
            <View style={styles.cardContentRow}>
              <View style={styles.cardContentItem}>
                <AppText weight="medium" color={theme.colors.support.yellow}>
                  210g
                </AppText>
                <AppText color={theme.colors.gray[700]}>Carboidratos</AppText>
              </View>
              <View style={styles.cardContentItem}>
                <AppText weight="medium" color={theme.colors.support.orange}>
                  210
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
