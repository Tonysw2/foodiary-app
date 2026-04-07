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

export function HeightStep() {
  const { nextStep } = useOnboarding()
  const [height, setHeight] = useState('')

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual é a sua altura?</StepTitle>
        <StepSubtitle>
          Usamos isso para calcular suas necessidades calóricas
        </StepSubtitle>
      </StepHeader>

      <StepContent position="center">
        <FormGroup label="Altura" style={{ width: '100%' }}>
          <Input
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
            placeholder="0"
            suffix="cm"
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
