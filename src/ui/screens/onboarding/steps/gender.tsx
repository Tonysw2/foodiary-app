import { Gender } from '@app/types/gender'
import { Button } from '@ui/components/button'
import {
  RadioGroup,
  RadioGroupIcon,
  RadioGroupItem,
  RadioGroupItemInfo,
  RadioGroupLabel,
} from '@ui/components/radio-group'
import { ArrowRightIcon } from 'lucide-react-native'
import { Controller, useFormContext } from 'react-hook-form'
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

const GENDER_OPTIONS: {
  value: Gender
  icon: string
  label: string
}[] = [
  {
    value: Gender.MALE,
    icon: '👨',
    label: 'Masculino',
  },
  {
    value: Gender.FEMALE,
    icon: '👩',
    label: 'Feminino',
  },
]

export function GenderStep() {
  const { control, trigger } = useFormContext<OnboardingSchema>()
  const { nextStep } = useOnboarding()

  async function handleNext() {
    const valid = await trigger('profile.gender')

    if (valid) {
      nextStep()
    }
  }

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual é seu sexo?</StepTitle>
        <StepSubtitle>
          Usado para calcular suas necessidades nutricionais
        </StepSubtitle>
      </StepHeader>

      <StepContent>
        <Controller
          control={control}
          name="profile.gender"
          render={({ field, fieldState }) => (
            <RadioGroup
              orientation="horizontal"
              value={field.value}
              onValueChange={(val) => {
                field.onChange(val)
                trigger('profile.gender')
              }}
              error={!!fieldState.error}
            >
              {GENDER_OPTIONS.map((option) => (
                <RadioGroupItem key={option.value} value={option.value}>
                  <RadioGroupIcon>{option.icon}</RadioGroupIcon>
                  <RadioGroupItemInfo>
                    <RadioGroupLabel>{option.label}</RadioGroupLabel>
                  </RadioGroupItemInfo>
                </RadioGroupItem>
              ))}
            </RadioGroup>
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
