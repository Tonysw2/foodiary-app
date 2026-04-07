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
import { useState } from 'react'
import {
  Step,
  StepContent,
  StepFooter,
  StepHeader,
  StepSubtitle,
  StepTitle,
} from '../components/steps'
import { useOnboarding } from '../contexts/onboarding-context'

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
    value: ActivityLevel.LIGHT,
    icon: '🚶',
    label: 'Levemente ativo',
    description: '1-2x por semana',
  },
  {
    value: ActivityLevel.MODERATE,
    icon: '🏃',
    label: 'Moderadamente ativo',
    description: '3-5x por semana',
  },
  {
    value: ActivityLevel.HEAVY,
    icon: '🏋️',
    label: 'Muito ativo',
    description: '6-7x por semana',
  },
  {
    value: ActivityLevel.ATHLETE,
    icon: '🏅',
    label: 'Atleta',
    description: '2x por dia',
  },
]

export function ActivityLevelStep() {
  const [selectedItem, setSelectedItem] = useState<ActivityLevel | null>(null)
  const { nextStep } = useOnboarding()

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual é seu nível de atividade?</StepTitle>
        <StepSubtitle>Com que frequência você se exercita?</StepSubtitle>
      </StepHeader>

      <StepContent>
        <RadioGroup
          value={selectedItem}
          onValueChange={(val) => setSelectedItem(val as ActivityLevel)}
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
      </StepContent>

      <StepFooter>
        <Button size="icon" onPress={nextStep}>
          <ArrowRightIcon />
        </Button>
      </StepFooter>
    </Step>
  )
}
