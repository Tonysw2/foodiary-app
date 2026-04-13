import video from '@ui/assets/ai-animation.mp4'
import { theme } from '@ui/styles/theme'
import { useVideoPlayer, VideoView } from 'expo-video'
import { View } from 'react-native'
import { AppText } from '../app-text'
import { Logo } from '../logo'
import { styles } from './styles'

interface CreateMealLoaderProps {
  type: 'audio' | 'picture'
}

export function CreateMealLoader({ type }: CreateMealLoaderProps) {
  const player = useVideoPlayer(video, (player) => {
    player.loop = true
    player.play()
  })

  return (
    <View style={styles.container}>
      <VideoView player={player} style={styles.video} nativeControls={false} />
      <View style={styles.content}>
        <Logo />
        <AppText color={theme.colors.gray[500]}>
          {type === 'audio' && 'Estou ouvindo o seu áudio...'}
          {type === 'picture' && 'Estou analisando sua foto...'}
        </AppText>
      </View>
    </View>
  )
}
