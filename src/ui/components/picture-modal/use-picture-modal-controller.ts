import { type CameraView, useCameraPermissions } from 'expo-camera'
import { useRef, useState } from 'react'
import { Linking } from 'react-native'

interface UsePictureModalControllerProps {
  onClose: () => void
  onConfirm?: (uri: string) => void
}

export function usePictureModalController({
  onClose,
  onConfirm,
}: UsePictureModalControllerProps) {
  const cameraRef = useRef<CameraView>(null)
  const [photoUri, setPhotoUri] = useState<string | null>(null)

  const [permission, requestPermission] = useCameraPermissions()

  async function handleTakePicture() {
    if (!cameraRef.current) {
      return
    }

    const picture = await cameraRef.current.takePictureAsync({
      imageType: 'jpg',
    })

    setPhotoUri(picture.uri)
  }

  function handleTryAgain() {
    setPhotoUri(null)
  }

  function handleClose() {
    setPhotoUri(null)
    onClose()
  }

  function handleConfirm() {
    if (photoUri) {
      onConfirm?.(photoUri)
    }
    handleClose()
  }

  function handleRequestPermission() {
    if (permission?.canAskAgain === false) {
      Linking.openSettings()
    } else {
      requestPermission()
    }
  }

  return {
    photoUri,
    permission,
    cameraRef,
    isLoading: false,
    handleClose,
    handleTakePicture,
    handleTryAgain,
    handleConfirm,
    handleRequestPermission,
  }
}
