import { theme } from '@ui/styles/theme'
import { CameraView } from 'expo-camera'
import {
  CameraIcon,
  CheckIcon,
  Trash2Icon,
  UnlockIcon,
  XIcon,
} from 'lucide-react-native'
import { Image, Modal, StatusBar, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { AppText } from '../app-text'
import { Button } from '../button'
import { CreateMealLoader } from '../create-meal-loader'
import { styles } from './styles'
import { usePictureModalController } from './use-picture-modal-controller'

interface PictureModalProps {
  visible: boolean
  onClose: () => void
  onConfirm?: (uri: string) => void
}

export function PictureModal({
  visible,
  onClose,
  onConfirm,
}: PictureModalProps) {
  const {
    photoUri,
    permission,
    cameraRef,
    isLoading,
    handleTakePicture,
    handleTryAgain,
    handleConfirm,
    handleRequestPermission,
  } = usePictureModalController({ onClose, onConfirm })

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <StatusBar animated translucent barStyle="light-content" />
      {isLoading && <CreateMealLoader type="picture" />}

      {!isLoading && permission && (
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

              {!permission?.granted && (
                <View style={styles.body}>
                  <View style={styles.permissionWrapper}>
                    <AppText
                      color={theme.colors.white}
                      style={{ textAlign: 'center' }}
                    >
                      {permission?.canAskAgain === false
                        ? 'A câmera está bloqueada. Para registrar sua refeição com uma foto, ative a permissão de câmera nas configurações do dispositivo.'
                        : 'Para registrar sua refeição com uma foto, precisamos de acesso à câmera do seu dispositivo.'}
                    </AppText>
                    <Button
                      variant="primary"
                      onPress={handleRequestPermission}
                      leftIcon={UnlockIcon}
                    >
                      <AppText color={theme.colors.black[700]}>
                        {permission?.canAskAgain === false
                          ? 'Abrir configurações'
                          : 'Conceder acesso à câmera'}
                      </AppText>
                    </Button>
                  </View>
                </View>
              )}

              {permission?.granted && (
                <>
                  <View style={styles.body}>
                    {!photoUri && (
                      <CameraView
                        ref={cameraRef}
                        style={styles.camera}
                        facing="back"
                      />
                    )}

                    {photoUri && (
                      <Image
                        source={{
                          uri: photoUri,
                        }}
                        style={styles.picture}
                        resizeMode="cover"
                      />
                    )}
                  </View>

                  <View style={styles.footer}>
                    {!photoUri ? (
                      <View style={styles.shutterWrapper}>
                        <Button
                          size="icon"
                          variant="neutral"
                          rippleStyle="light"
                          onPress={handleTakePicture}
                        >
                          <CameraIcon color={theme.colors.lime[600]} />
                        </Button>
                        <AppText color={theme.colors.white}>Tirar Foto</AppText>
                      </View>
                    ) : (
                      <View style={styles.previewActions}>
                        <Button
                          size="icon"
                          variant="neutral"
                          rippleStyle="light"
                          onPress={handleTryAgain}
                        >
                          <Trash2Icon color={theme.colors.lime[600]} />
                        </Button>
                        <Button
                          size="icon"
                          variant="primary"
                          onPress={handleConfirm}
                        >
                          <CheckIcon color={theme.colors.black[700]} />
                        </Button>
                      </View>
                    )}
                  </View>
                </>
              )}
            </SafeAreaView>
          </SafeAreaProvider>
        </View>
      )}
    </Modal>
  )
}
