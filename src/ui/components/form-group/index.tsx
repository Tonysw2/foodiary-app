import { theme } from '@ui/styles/theme'
import { cloneElement } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import { AppText } from '../app-text'
import { styles } from './styles'

interface IFormGroupProps {
  label: string
  children: React.ReactElement<{ error?: boolean }>
  error?: string
  style?: StyleProp<ViewStyle>
}

export function FormGroup({ label, children, error, style }: IFormGroupProps) {
  return (
    <View style={[styles.container, style]}>
      <AppText weight="medium">{label}</AppText>
      {cloneElement(children, { error: !!error })}
      {error && (
        <AppText size="sm" color={theme.colors.support.red}>
          {error}
        </AppText>
      )}
    </View>
  )
}
