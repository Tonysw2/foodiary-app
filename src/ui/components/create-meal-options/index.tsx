import { theme } from '@ui/styles/theme'
import { ImageIcon, type LucideIcon, MicIcon } from 'lucide-react-native'
import { useState } from 'react'
import { Platform, Pressable, View } from 'react-native'
import { AppText } from '../app-text'
import { AudioModal } from '../audio-modal'
import { PictureModal } from '../picture-modal'
import { styles } from './styles'

interface CreateMealOptionsProps {
  disabled?: boolean
  onCreate: () => void
}

export function CreateMealOptions({
  disabled,
  onCreate,
}: CreateMealOptionsProps) {
  const [currentVisibleModal, setCurrentVisibleModal] = useState<
    null | 'audio' | 'picture'
  >(null)

  function handleOpenModal(modal: 'audio' | 'picture') {
    setCurrentVisibleModal(modal)
  }

  function handleCloseModal() {
    setCurrentVisibleModal(null)
  }

  return (
    <View style={styles.container}>
      <AudioModal
        visible={currentVisibleModal === 'audio'}
        onClose={handleCloseModal}
        onConfirm={onCreate}
      />
      <PictureModal
        visible={currentVisibleModal === 'picture'}
        onClose={handleCloseModal}
        onConfirm={onCreate}
      />

      <MealOptionButton
        icon={MicIcon}
        label="Audio"
        disabled={disabled}
        onPress={() => handleOpenModal('audio')}
      />
      <MealOptionButton
        icon={ImageIcon}
        label="Image"
        disabled={disabled}
        onPress={() => handleOpenModal('picture')}
      />
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
