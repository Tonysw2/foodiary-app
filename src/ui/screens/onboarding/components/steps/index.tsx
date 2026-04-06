import { AppText } from '@ui/components/app-text'
import { View } from 'react-native'
import { styles } from './styles'

export function Step({ children }: { children: React.ReactNode }) {
  return <View style={styles.step}>{children}</View>
}

export function StepHeader({ children }: { children: React.ReactNode }) {
  return <View style={styles.stepHeader}>{children}</View>
}

export function StepTitle({ children }: { children: string }) {
  return (
    <AppText size="3xl" weight="semiBold" style={styles.stepTitle}>
      {children}
    </AppText>
  )
}

export function StepSubtitle({ children }: { children: string }) {
  return <AppText style={styles.stepSubtitle}>{children}</AppText>
}

interface StepContentProps {
  children: React.ReactNode
  position?: 'center' | 'end'
}

export function StepContent({ position = 'end', children }: StepContentProps) {
  return (
    <View
      style={[
        styles.stepContent,
        position === 'center' && styles.contentCenter,
      ]}
    >
      {children}
    </View>
  )
}

interface StepFooterProps {
  children: React.ReactNode
  align?: 'start' | 'end'
}

export function StepFooter({ children, align = 'end' }: StepFooterProps) {
  return (
    <View
      style={[styles.stepFooter, align === 'end' && { alignItems: 'flex-end' }]}
    >
      {children}
    </View>
  )
}
