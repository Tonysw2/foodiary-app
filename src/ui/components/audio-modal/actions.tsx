import { theme } from '@ui/styles/theme'
import { MicIcon } from 'lucide-react-native'
import { AppText } from '../app-text'
import { Button } from '../button'
import { AudioPlayer } from './audio-player'
import { RecordingControls } from './recording-controls'
import type { AudioModalState } from './types'

interface ActionsProps {
  status: AudioModalState
  audioUri: string | null
  onStartRecording: () => void
  onStopRecording: () => void
  onTryAgain: () => void
  onConfirmRecording: () => void
}

export function Actions({
  status,
  audioUri,
  onStartRecording,
  onStopRecording,
  onTryAgain,
  onConfirmRecording,
}: ActionsProps) {
  if (status === 'idle') {
    return (
      <>
        <Button
          size="icon"
          variant="neutral"
          rippleStyle="light"
          onPress={onStartRecording}
        >
          <MicIcon size={20} color={theme.colors.lime[600]} />
        </Button>
        <AppText
          align="center"
          color={theme.colors.gray[500]}
          style={{ maxWidth: 180 }}
        >
          Clique no microfone para começar a gravar
        </AppText>
      </>
    )
  }

  if (status === 'recording') {
    return <RecordingControls onStop={onStopRecording} />
  }

  if (status === 'recorded' && audioUri) {
    return (
      <AudioPlayer
        audioUri={audioUri}
        onDelete={onTryAgain}
        onConfirm={onConfirmRecording}
      />
    )
  }

  return null
}
