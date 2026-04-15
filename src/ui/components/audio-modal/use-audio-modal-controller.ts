import { createMealMutationOptions } from '@app/lib/mutation-options/create-meal-mutation-options'
import { getMealByIdQueryOptions } from '@app/lib/query-options/get-meal-by-id-query-options'
import { mealsQueryKeys } from '@app/lib/query-options/get-meals-query-options'
import type { AppStackNavigationProps } from '@app/navigation/app-stack/types'
import { useNavigation } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
} from 'expo-audio'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Alert } from 'react-native'
import type { AudioModalState } from './types'

interface UseAudioModalControllerProps {
  onClose: () => void
  onConfirm?: () => void
}

export function useAudioModalController({
  onClose,
  onConfirm,
}: UseAudioModalControllerProps) {
  const [state, setState] = useState<AudioModalState>('idle')
  const [audioUri, setAudioUri] = useState<string | null>(null)
  const audioRecorder = useAudioRecorder(RecordingPresets.LOW_QUALITY)

  const navigation = useNavigation<AppStackNavigationProps>()
  const queryClient = useQueryClient()

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

  async function handleStartRecording() {
    await audioRecorder.prepareToRecordAsync()
    audioRecorder.record()
    setState('recording')
  }

  async function handleStopRecording() {
    await audioRecorder.stop()
    setAudioUri(audioRecorder.uri)
    setState('recorded')
  }

  function handleTryAgain() {
    setAudioUri(null)
    setState('idle')
  }

  async function handleConfirmRecording() {
    if (!audioUri) {
      return
    }

    try {
      await createMealFn(audioUri)
    } catch (error) {
      console.error(error)

      Alert.alert(
        'Oops!',
        'Ocorreu um erro ao criar a sua refeição! Tente novamente.',
      )
    }
  }

  useEffect(() => {
    const load = async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync()
      if (!status.granted) {
        Alert.alert('Permission to access microphone was denied')
      }

      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      })
    }
    load()
  }, [])

  return {
    state,
    audioUri,
    isLoading: isCreatingMeal || isFetchingMeal || !!isProcessing,
    handleStartRecording,
    handleStopRecording,
    handleTryAgain,
    handleConfirmRecording,
  }
}
