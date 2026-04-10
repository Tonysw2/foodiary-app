import { theme } from '@ui/styles/theme'
import { ImageIcon, type LucideIcon, MicIcon } from 'lucide-react-native'
import { Platform, Pressable, View } from 'react-native'
import { AppText } from '../app-text'
import { styles } from './styles'

interface CreateMealOptionsProps {
  disabled?: boolean
}

export function CreateMealOptions({ disabled }: CreateMealOptionsProps) {
  return (
    <View style={styles.container}>
      <MealOptionButton icon={MicIcon} label="Audio" disabled={disabled} />
      <MealOptionButton icon={ImageIcon} label="Image" disabled={disabled} />
    </View>
  )
}

interface MealOptionButtonProps {
  icon: LucideIcon
  label: string
  disabled?: boolean
  onPress?: () => void
}

function MealOptionButton({
  icon: Icon,
  label,
  disabled,
  onPress,
}: MealOptionButtonProps) {
  return (
    <View style={styles.buttonWrapper}>
      <Pressable
        disabled={disabled}
        android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', foreground: true }}
        style={({ pressed }) => [
          styles.button,
          (disabled || (pressed && Platform.OS === 'ios')) && { opacity: 0.5 },
        ]}
        onPress={onPress}
      >
        <View style={styles.iconWrapper}>
          <Icon size={28} color={theme.colors.black[700]} />
        </View>
        <AppText
          weight="semiBold"
          color={theme.colors.black[700]}
          style={{ letterSpacing: -0.16 }}
        >
          {label}
        </AppText>
      </Pressable>
    </View>
  )
}
