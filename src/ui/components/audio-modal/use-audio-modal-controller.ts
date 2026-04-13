import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
} from 'expo-audio'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import type { AudioModalState } from './types'

export function useAudioModalController() {
  const [state, setState] = useState<AudioModalState>('idle')
  const [audioUri, setAudioUri] = useState<string | null>(null)
  const audioRecorder = useAudioRecorder(RecordingPresets.LOW_QUALITY)

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

  function handleConfirmRecording() {
    alert('send audio to api')
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
    handleStartRecording,
    handleStopRecording,
    handleTryAgain,
    handleConfirmRecording,
  }
}
