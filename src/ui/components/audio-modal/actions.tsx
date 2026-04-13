import { theme } from '@ui/styles/theme'
import { MicIcon } from 'lucide-react-native'
import { AppText } from '../app-text'
import { Button } from '../button'

interface ActionsProps {
  status: 'idle' | 'recording' | 'recorded'
}

export function Actions({ status }: ActionsProps) {
  switch (status) {
    case 'idle': {
      return (
        <>
          <Button size="icon" variant="neutral">
            <MicIcon color={theme.colors.lime[600]} />
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

    case 'recorded': {
      return <AppText>recorded</AppText>
    }

    case 'recording': {
      return <AppText>recording</AppText>
    }

    default: {
      return null
    }
  }
}
