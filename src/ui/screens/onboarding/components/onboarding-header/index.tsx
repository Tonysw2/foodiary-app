import { Button } from '@ui/components/button'
import { theme } from '@ui/styles/theme'
import { ChevronLeft } from 'lucide-react-native'
import { View } from 'react-native'
import { useOnboarding } from '../../contexts/onboarding-context'
import { styles } from './styles'

export function OnboardingHeader() {
  const { previousStep } = useOnboarding()

  return (
    <View style={styles.container}>
      <Button size="icon" variant="ghost" onPress={previousStep}>
        <ChevronLeft size={20} color={theme.colors.black[700]} />
      </Button>

      <View style={styles.progressBarBackground}>
        <View style={styles.progressBarForeground} />
      </View>

      <View style={styles.rightActionPlaceholder} />
    </View>
  )
}
