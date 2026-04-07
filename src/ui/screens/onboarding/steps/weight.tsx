import { Button } from '@ui/components/button'
import { FormGroup } from '@ui/components/form-group'
import { Input } from '@ui/components/input'
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

export function WeightStep() {
  const { control, trigger } = useFormContext<OnboardingSchema>()
  const { nextStep } = useOnboarding()

  async function handleNext() {
    const valid = await trigger('profile.weight')

    if (valid) {
      nextStep()
    }
  }

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual é o seu peso?</StepTitle>
        <StepSubtitle>
          Usamos isso para calcular suas necessidades calóricas
        </StepSubtitle>
      </StepHeader>

      <StepContent position="center">
        <Controller
          control={control}
          name="profile.weight"
          render={({ field, fieldState }) => (
            <FormGroup
              label="Peso"
              error={fieldState.error?.message}
              style={{ width: '100%' }}
            >
              <Input
                value={field.value ? String(field.value) : ''}
                onChangeText={(val) => {
                  field.onChange(parseFloat(val))
                  trigger('profile.weight')
                }}
                keyboardType="numeric"
                placeholder="0"
                suffix="kg"
              />
            </FormGroup>
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
