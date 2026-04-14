import { createMealMutationOptions } from '@app/lib/mutation-options/create-meal-mutation-options'
import { useMutation } from '@tanstack/react-query'
import { type CameraView, useCameraPermissions } from 'expo-camera'
import { useRef, useState } from 'react'
import { Alert, Linking } from 'react-native'

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

  const { mutateAsync: createMealFn } = useMutation(createMealMutationOptions())

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

  async function handleConfirm() {
    if (!photoUri) {
      return
    }

    try {
      await createMealFn(photoUri)
    } catch (error) {
      console.error(error)

      Alert.alert(
        'Oops!',
        'Ocorreu um erro ao criar a sua refeição! Tente novamente.',
      )
    }
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
