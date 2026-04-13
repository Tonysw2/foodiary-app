import { theme } from '@ui/styles/theme'
import { XIcon } from 'lucide-react-native'
import { Modal, StatusBar, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { AppText } from '../app-text'
import { Button } from '../button'
import { Actions } from './actions'
import { styles } from './styles'

interface AudioModalProps {
  visible: boolean
  onClose: () => void
}

export function AudioModal({ visible, onClose }: AudioModalProps) {
  const isRecording = true

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <StatusBar animated translucent barStyle="light-content" />
      <View style={styles.container}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.content}>
            <View style={styles.header}>
              <Button
                onPress={onClose}
                size="icon"
                variant="neutral"
                rippleStyle="light"
              >
                <XIcon color={theme.colors.white} />
              </Button>
            </View>
            <View style={styles.body}>
              <View
                style={[styles.circle1, isRecording && styles.circle1Recording]}
              >
                <View
                  style={[
                    styles.circle2,
                    isRecording && styles.circle2Recording,
                  ]}
                >
                  <View
                    style={[
                      styles.circle3,
                      isRecording && styles.circle3Recording,
                    ]}
                  />
                </View>
              </View>
              <AppText
                color={theme.colors.gray[500]}
                style={styles.instructionsLabel}
              >
                Tente dizer algo como: 100g de Arroz, 2 Ovos e 100g de Salada
              </AppText>
            </View>
            <View style={styles.footer}>
              <View style={styles.actionsContainer}>
                <Actions status="idle" />
              </View>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </View>
    </Modal>
  )
}
