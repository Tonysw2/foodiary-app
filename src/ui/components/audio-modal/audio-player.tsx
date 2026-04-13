import { theme } from '@ui/styles/theme'
import { formatSeconds } from '@ui/utils/time'
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio'
import { CheckIcon, PauseIcon, PlayIcon, Trash2Icon } from 'lucide-react-native'
import { View } from 'react-native'
import { AppText } from '../app-text'
import { Button } from '../button'

interface AudioPlayerProps {
  audioUri: string
  onDelete: () => void
  onConfirm: () => void
}

export function AudioPlayer({
  audioUri,
  onDelete,
  onConfirm,
}: AudioPlayerProps) {
  const player = useAudioPlayer(audioUri)
  const status = useAudioPlayerStatus(player)

  function handlePlayPause() {
    if (status.playing) {
      player.pause()
    } else {
      if (status.didJustFinish) {
        player.seekTo(0)
      }
      player.play()
    }
  }

  return (
    <>
      <View style={{ flexDirection: 'row', gap: 32 }}>
        <Button size="icon" variant="neutral" onPress={onDelete}>
          <Trash2Icon size={20} color={theme.colors.gray[500]} />
        </Button>
        <Button size="icon" variant="neutral" onPress={handlePlayPause}>
          {status.playing ? (
            <PauseIcon
              size={20}
              fill={theme.colors.lime[600]}
              color={theme.colors.lime[600]}
            />
          ) : (
            <PlayIcon
              size={20}
              fill={theme.colors.lime[600]}
              color={theme.colors.lime[600]}
            />
          )}
        </Button>
        <Button size="icon" onPress={onConfirm}>
          <CheckIcon size={20} />
        </Button>
      </View>
      <AppText
        align="center"
        color={theme.colors.gray[500]}
        style={{ maxWidth: 180 }}
      >
        {formatSeconds(Math.floor(status.currentTime))} /{' '}
        {formatSeconds(Math.floor(status.duration))}
      </AppText>
    </>
  )
}
