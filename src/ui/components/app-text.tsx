import { theme } from '@ui/styles/theme'
import { Text, type TextProps } from 'react-native'

type AppTextProps = TextProps & {
  size?: keyof typeof theme.fontSize
  weight?: keyof typeof theme.fontFamily.sans
  color?: string
}

export function AppText({
  size = 'base',
  weight = 'regular',
  color = theme.colors.black[700],
  style,
  ...props
}: AppTextProps) {
  return (
    <Text
      style={[
        {
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
