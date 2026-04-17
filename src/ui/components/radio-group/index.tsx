import { theme } from '@ui/styles/theme'
import type React from 'react'
import { createContext, use } from 'react'
import {
  type StyleProp,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native'
import { AppText } from '../app-text'
import { styles } from './styles'

interface RadioGroupContextValue {
  value: string | null
  onValueChange: (value: string) => void
  orientation: 'vertical' | 'horizontal'
  isHorizontal: boolean
  error: boolean
  disabled: boolean
}

const RadioGroupContext = createContext({} as RadioGroupContextValue)

interface IRadioGroupProps {
  value: string | null
  onValueChange: (value: string) => void
  orientation?: 'vertical' | 'horizontal'
  error?: boolean
  disabled?: boolean
  children: React.ReactNode
}

export function RadioGroup({
  value,
  onValueChange,
  orientation = 'vertical',
  error = false,
  disabled = false,
  children,
}: IRadioGroupProps) {
  const isHorizontal = orientation === 'horizontal'

  return (
    <RadioGroupContext.Provider
      value={{ value, onValueChange, orientation, isHorizontal, error, disabled }}
    >
      <View
        style={[styles.container, isHorizontal && styles.containerHorizontal]}
      >
        {children}
      </View>
    </RadioGroupContext.Provider>
  )
}

interface RadioGroupItemContextValue {
  isSelected: boolean
}

const RadioGroupItemContext = createContext<RadioGroupItemContextValue>({
  isSelected: false,
})

interface IRadioGroupItemProps {
  children: React.ReactNode
  value: string
  disabled?: boolean
  style?: StyleProp<ViewStyle>
}

export function RadioGroupItem({
  value,
  disabled = false,
  style,
  children,
}: IRadioGroupItemProps) {
  const {
    value: selectedValue,
    onValueChange,
    orientation,
    error,
    disabled: groupDisabled,
  } = use(RadioGroupContext)
  const isSelected = selectedValue === value
  const isDisabled = disabled || groupDisabled

  return (
    <RadioGroupItemContext.Provider value={{ isSelected }}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.item,
          orientation === 'horizontal' && styles.itemHorizontal,
          isSelected && styles.itemSelected,
          error && styles.itemError,
          isDisabled && styles.itemDisabled,
          style,
        ]}
        disabled={isDisabled}
        onPress={() => onValueChange(value)}
      >
        {children}
      </TouchableOpacity>
    </RadioGroupItemContext.Provider>
  )
}

export function RadioGroupLabel({ children }: { children: React.ReactNode }) {
  const { isHorizontal } = use(RadioGroupContext)

  return (
    <AppText
      weight="semiBold"
      style={[styles.label, isHorizontal && styles.textCenter]}
    >
      {children}
    </AppText>
  )
}

export function RadioGroupDescription({
  children,
}: {
  children: React.ReactNode
}) {
  const { isHorizontal } = use(RadioGroupContext)

  return (
    <AppText
      size="sm"
      color={theme.colors.gray[700]}
      style={[isHorizontal && styles.textCenter]}
    >
      {children}
    </AppText>
  )
}

export function RadioGroupIcon({ children }: { children: React.ReactNode }) {
  const { isSelected } = use(RadioGroupItemContext)

  return (
    <View style={[styles.icon, isSelected && styles.iconWithBg]}>
      <AppText>{children}</AppText>
    </View>
  )
}

export function RadioGroupItemInfo({
  children,
}: {
  children: React.ReactNode
}) {
  return <View style={styles.itemInfo}>{children}</View>
}
