import { theme } from '@ui/styles/theme'
import { Text, type TextProps, type TextStyle } from 'react-native'

type AppTextProps = TextProps & {
  size?: keyof typeof theme.fontSize
  weight?: keyof typeof theme.fontFamily.sans
  color?: string
  align?: TextStyle['textAlign']
}

export function AppText({
  size = 'base',
  weight = 'regular',
  color = theme.colors.black[700],
  align = 'left',
  style,
  ...props
}: AppTextProps) {
  return (
    <Text
      style={[
        {
          textAlign: align,
          fontSize: theme.fontSize[size],
          fontFamily: theme.fontFamily.sans[weight],
          color,
        },
        style,
      ]}
      {...props}
    />
  )
}
