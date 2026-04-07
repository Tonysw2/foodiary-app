import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { AppText } from '@ui/components/app-text'
import { Button } from '@ui/components/button'
import { theme } from '@ui/styles/theme'
import { ArrowRightIcon } from 'lucide-react-native'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Platform, TouchableOpacity } from 'react-native'
import {
  Step,
  StepContent,
  StepFooter,
  StepHeader,
  StepSubtitle,
  StepTitle,
} from '../components/steps'
import { useOnboarding } from '../contexts/onboarding-context'
import type { OnboardingSchema } from '../schema'

function formatDate(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function BirthDateStep() {
  const { control, trigger } = useFormContext<OnboardingSchema>()
  const { nextStep } = useOnboarding()

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(true)

  async function handleNext() {
    const valid = await trigger('profile.birthDate')

    if (valid) {
      nextStep()
    }
  }

  return (
    <Step>
      <StepHeader>
        <StepTitle>Que dia você nasceu?</StepTitle>
        <StepSubtitle>Cada faixa etária responde de forma única</StepSubtitle>
      </StepHeader>

      <StepContent position="center">
        <Controller
          control={control}
          name="profile.birthDate"
          render={({ field }) => (
            <>
              {isDatePickerVisible && (
                <DateTimePicker
                  mode="date"
                  value={new Date(field.value)}
                  onChange={(_: DateTimePickerEvent, selected?: Date) => {
                    if (selected) {
                      field.onChange(selected.toISOString())
                      trigger('profile.birthDate')
                    }

                    if (Platform.OS === 'android') {
                      setIsDatePickerVisible(false)
                    }
                  }}
                  display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                />
              )}

              {Platform.OS === 'android' && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setIsDatePickerVisible(true)}
                >
                  <AppText
                    size="3xl"
                    weight="semiBold"
                    color={theme.colors.gray[700]}
                  >
                    {formatDate(new Date(field.value))}
                  </AppText>
                </TouchableOpacity>
              )}
            </>
          )}
        />
      </StepContent>

      <StepFooter>
        <Button size="icon" onPress={handleNext}>
          <ArrowRightIcon />
        </Button>
      </StepFooter>
    </Step>
  )
}
