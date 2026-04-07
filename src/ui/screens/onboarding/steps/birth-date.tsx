import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { AppText } from '@ui/components/app-text'
import { Button } from '@ui/components/button'
import { theme } from '@ui/styles/theme'
import { ArrowRightIcon } from 'lucide-react-native'
import { useState } from 'react'
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

function formatDate(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function BirthDateStep() {
  const { nextStep } = useOnboarding()

  const [date, setDate] = useState<Date>(new Date())
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(true)

  const onChange = (_: DateTimePickerEvent, selected?: Date) => {
    if (selected) {
      setDate(selected)
    }

    if (Platform.OS === 'android') {
      setIsDatePickerVisible(false)
    }
  }

  return (
    <Step>
      <StepHeader>
        <StepTitle>Que dia você nasceu?</StepTitle>
        <StepSubtitle>Cada faixa etária responde de forma única</StepSubtitle>
      </StepHeader>

      <StepContent position="center">
        {isDatePickerVisible && (
          <DateTimePicker
            mode="date"
            value={date}
            onChange={onChange}
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
              {formatDate(date)}
            </AppText>
          </TouchableOpacity>
        )}
      </StepContent>

      <StepFooter>
        <Button size="icon" onPress={nextStep}>
          <ArrowRightIcon />
        </Button>
      </StepFooter>
    </Step>
  )
}
