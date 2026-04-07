import { Button } from '@ui/components/button'
import { FormGroup } from '@ui/components/form-group'
import { Input } from '@ui/components/input'
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

export function WeightStep() {
  const { nextStep } = useOnboarding()
  const [weight, setWeight] = useState('')

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual é o seu peso?</StepTitle>
        <StepSubtitle>
          Usamos isso para calcular suas necessidades calóricas
        </StepSubtitle>
      </StepHeader>

      <StepContent position="center">
        <FormGroup label="Peso" style={{ width: '100%' }}>
          <Input
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            placeholder="0"
            suffix="kg"
          />
        </FormGroup>
      </StepContent>

      <StepFooter>
        <Button size="icon" onPress={nextStep}>
          <ArrowRightIcon />
        </Button>
      </StepFooter>
    </Step>
  )
}
