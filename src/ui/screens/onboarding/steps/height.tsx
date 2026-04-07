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

export function HeightStep() {
  const { control, trigger } = useFormContext<OnboardingSchema>()
  const { nextStep } = useOnboarding()

  async function handleNext() {
    const valid = await trigger('profile.height')

    if (valid) {
      nextStep()
    }
  }

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual é a sua altura?</StepTitle>
        <StepSubtitle>
          Usamos isso para calcular suas necessidades calóricas
        </StepSubtitle>
      </StepHeader>

      <StepContent position="center">
        <Controller
          control={control}
          name="profile.height"
          render={({ field, fieldState }) => (
            <FormGroup
              label="Altura"
              error={fieldState.error?.message}
              style={{ width: '100%' }}
            >
              <Input
                value={field.value ? String(field.value) : ''}
                onChangeText={(val) => {
                  field.onChange(parseFloat(val))
                  trigger('profile.height')
                }}
                keyboardType="numeric"
                placeholder="0"
                suffix="cm"
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
