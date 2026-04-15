import { createMealMutationOptions } from '@app/lib/mutation-options/create-meal-mutation-options'
import { getMealByIdQueryOptions } from '@app/lib/query-options/get-meal-by-id-query-options'
import { mealsQueryKeys } from '@app/lib/query-options/get-meals-query-options'
import type { AppStackNavigationProps } from '@app/navigation/app-stack/types'
import { useNavigation } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { type CameraView, useCameraPermissions } from 'expo-camera'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Alert, Linking } from 'react-native'

interface UsePictureModalControllerProps {
  onClose: () => void
  onConfirm?: () => void
}

export function usePictureModalController({
  onClose,
  onConfirm,
}: UsePictureModalControllerProps) {
  const navigation = useNavigation<AppStackNavigationProps>()
  const cameraRef = useRef<CameraView>(null)
  const [photoUri, setPhotoUri] = useState<string | null>(null)

  const queryClient = useQueryClient()

  const [permission, requestPermission] = useCameraPermissions()

  const {
    data: createdMeal,
    isPending: isCreatingMeal,
    mutateAsync: createMealFn,
  } = useMutation(createMealMutationOptions())

  const { data, isFetching: isFetchingMeal } = useQuery(
    getMealByIdQueryOptions(createdMeal?.mealId),
  )

  const memoizedOnClose = useRef(onClose)
  useLayoutEffect(() => {
    memoizedOnClose.current = onClose
  }, [onClose])

  const memoizedOnConfirm = useRef(onConfirm)
  useLayoutEffect(() => {
    memoizedOnConfirm.current = onConfirm
  }, [onConfirm])

  const isProcessing =
    data?.meal &&
    data.meal.status !== 'SUCCESS' &&
    data.meal.status !== 'FAILED'

  useEffect(() => {
    if (data?.meal.status === 'SUCCESS') {
      memoizedOnClose.current()
      memoizedOnConfirm.current?.()
      queryClient.invalidateQueries({ queryKey: mealsQueryKeys.all })
      navigation.navigate('MealDetails', { mealId: data.meal.id })
    }

    if (data?.meal.status === 'FAILED') {
      Alert.alert(
        'Oops!',
        'Não foi possível processar sua refeição. Tente novamente.',
      )
    }
  }, [data?.meal.id, data?.meal.status, navigation.navigate, queryClient])

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
    isLoading: isCreatingMeal || isFetchingMeal || isProcessing,
    handleClose,
    handleTakePicture,
    handleTryAgain,
    handleConfirm,
    handleRequestPermission,
  }
}
