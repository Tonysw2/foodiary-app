import { theme } from '@ui/styles/theme'
import { formatSeconds } from '@ui/utils/time'
import { PauseIcon } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { AppText } from '../app-text'
import { Button } from '../button'

const MAX_DURATION = 30

interface RecordingControlsProps {
  onStop: () => void
}

export function RecordingControls({ onStop }: RecordingControlsProps) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1
        if (next >= MAX_DURATION) {
          clearInterval(interval)
          onStop()
        }
        return next
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [onStop])

  return (
    <>
      <Button
        size="icon"
        variant="neutral"
        rippleStyle="light"
        onPress={onStop}
      >
        <PauseIcon size={20} color={theme.colors.lime[600]} />
      </Button>
      <AppText
        align="center"
        color={theme.colors.gray[500]}
        style={{ maxWidth: 180 }}
      >
        {formatSeconds(elapsed)}
      </AppText>
    </>
  )
}
