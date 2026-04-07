import { ActivityLevel } from '@app/types/activity-level'
import { Button } from '@ui/components/button'
import {
  RadioGroup,
  RadioGroupDescription,
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

const ACTIVITY_LEVEL_OPTIONS: {
  value: ActivityLevel
  icon: string
  label: string
  description: string
}[] = [
  {
    value: ActivityLevel.SEDENTARY,
    icon: '🪑',
    label: 'Sedentário',
    description: 'Pouco ou nenhum exercício',
  },
  {
    value: ActivityLevel.LIGHTLY_ACTIVE,
    icon: '🚶',
    label: 'Levemente ativo',
    description: '1-2x por semana',
  },
  {
    value: ActivityLevel.MODERATELY_ACTIVE,
    icon: '🏃',
    label: 'Moderadamente ativo',
    description: '3-5x por semana',
  },
  {
    value: ActivityLevel.VERY_ACTIVE,
    icon: '🏋️',
    label: 'Muito ativo',
    description: '6-7x por semana',
  },
  {
    value: ActivityLevel.EXTRA_ACTIVE,
    icon: '🏅',
    label: 'Atleta',
    description: '2x por dia',
  },
]

export function ActivityLevelStep() {
  const { control, trigger } = useFormContext<OnboardingSchema>()
  const { nextStep } = useOnboarding()

  async function handleNext() {
    const valid = await trigger('profile.activityLevel')
    if (valid) nextStep()
  }

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual é seu nível de atividade?</StepTitle>
        <StepSubtitle>Com que frequência você se exercita?</StepSubtitle>
      </StepHeader>

      <StepContent>
        <Controller
          control={control}
          name="profile.activityLevel"
          render={({ field, fieldState }) => (
            <RadioGroup
              value={field.value}
              onValueChange={(val) => {
                field.onChange(val as ActivityLevel)
                trigger('profile.activityLevel')
              }}
              error={!!fieldState.error}
            >
              {ACTIVITY_LEVEL_OPTIONS.map((option) => (
                <RadioGroupItem key={option.value} value={option.value}>
                  <RadioGroupIcon>{option.icon}</RadioGroupIcon>
                  <RadioGroupItemInfo>
                    <RadioGroupLabel>{option.label}</RadioGroupLabel>
                    <RadioGroupDescription>
                      {option.description}
                    </RadioGroupDescription>
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
