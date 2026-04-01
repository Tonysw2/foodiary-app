import { theme } from '@ui/styles/theme'
import { useState } from 'react'
import {
  type BlurEvent,
  type FocusEvent,
  TextInput,
  type TextInputProps,
  View,
} from 'react-native'
import { AppText } from '../app-text'
import { inputStyles, styles } from './styles'

type BaseTextInputProps = Omit<
  React.ComponentProps<typeof TextInput>,
  'readOnly'
>

export interface IInputProps extends BaseTextInputProps {
  error?: boolean
  disabled?: boolean
  InputComponent?: React.ComponentType<TextInputProps>
  ref?: React.Ref<TextInput>
  formatter?: (value: string) => string
  suffix?: string
}

export function Input({
  style,
  error,
  disabled,
  suffix,
  InputComponent = TextInput,
  onBlur,
  onFocus,
  formatter,
  onChangeText,
  ...props
}: IInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  function handleFocus(event: FocusEvent) {
    setIsFocused(true)
    onFocus?.(event)
  }

  function handleBlur(event: BlurEvent) {
    setIsFocused(false)
    onBlur?.(event)
  }

  function handleChangeText(value: string) {
    const formattedValue = formatter?.(value) ?? value

    onChangeText?.(formattedValue)
  }

  const input = (
    <InputComponent
      style={[
        inputStyles({
          status: error ? 'error' : isFocused ? 'focus' : 'default',
          disabled: disabled ? 'true' : 'false',
          hasSuffix: suffix ? 'true' : 'false',
        }),
        style,
      ]}
      placeholderTextColor={theme.colors.gray[700]}
      onFocus={handleFocus}
      onBlur={handleBlur}
      readOnly={disabled}
      onChangeText={handleChangeText}
      {...props}
    />
  )

  if (suffix) {
    return (
      <View style={styles.inputWithSuffix}>
        {input}
        <View style={styles.suffix}>
          <AppText color={theme.colors.gray[700]}>{suffix}</AppText>
        </View>
      </View>
    )
  }

  return input
}
