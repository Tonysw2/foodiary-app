import { Button } from '@ui/components/button'
import { theme } from '@ui/styles/theme'
import { ChevronLeft } from 'lucide-react-native'
import { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'
import { useOnboarding } from '../../contexts/onboarding-context'
import { TOTAL_STEPS } from '../../steps/ordered-steps'
import { styles } from './styles'

export function OnboardingHeader() {
  const { previousStep, currentIndex } = useOnboarding()

  const widthAnimation = useRef(new Animated.Value(0))

  useEffect(() => {
    const progress = ((currentIndex + 1) * 100) / TOTAL_STEPS

    Animated.timing(widthAnimation.current, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [currentIndex])

  return (
    <View style={styles.container}>
      <Button size="icon" variant="ghost" onPress={previousStep}>
        <ChevronLeft size={20} color={theme.colors.black[700]} />
      </Button>

      <View style={styles.progressBarBackground}>
        <Animated.View
          style={[
            styles.progressBarForeground,
            {
              width: widthAnimation.current.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>

      <View style={styles.rightActionPlaceholder} />
    </View>
  )
}
