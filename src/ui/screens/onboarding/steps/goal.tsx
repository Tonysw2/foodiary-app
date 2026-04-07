import { Goal } from '@app/types/goal'
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

const GOAL_OPTIONS: {
  value: Goal
  icon: string
  label: string
  description: string
}[] = [
  {
    value: Goal.LOSE,
    icon: '🔥',
    label: 'Perder peso',
    description: 'Reduzir gordura corporal',
  },
  {
    value: Goal.MAINTAIN,
    icon: '⚖️',
    label: 'Manter peso',
    description: 'Manter o peso atual',
  },
  {
    value: Goal.GAIN,
    icon: '💪',
    label: 'Ganhar peso',
    description: 'Aumentar massa muscular',
  },
]

export function GoalStep() {
  const { control, trigger } = useFormContext<OnboardingSchema>()
  const { nextStep } = useOnboarding()

  async function handleNext() {
    const valid = await trigger('profile.goal')

    if (valid) {
      nextStep()
    }
  }

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual é seu objetivo?</StepTitle>
        <StepSubtitle>O que você pretende alcançar com a dieta?</StepSubtitle>
      </StepHeader>

      <StepContent>
        <Controller
          control={control}
          name="profile.goal"
          render={({ field, fieldState }) => (
            <RadioGroup
              value={field.value}
              onValueChange={(val) => {
                field.onChange(val)
                trigger('profile.goal')
              }}
              error={!!fieldState.error}
            >
              {GOAL_OPTIONS.map((option) => (
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
