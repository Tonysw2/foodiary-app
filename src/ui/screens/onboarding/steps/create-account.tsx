import { Button } from '@ui/components/button'
import { FormGroup } from '@ui/components/form-group'
import { Input } from '@ui/components/input'
import { useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { type TextInput, View } from 'react-native'
import {
  Step,
  StepContent,
  StepFooter,
  StepHeader,
  StepSubtitle,
  StepTitle,
} from '../components/steps'
import type { OnboardingSchema } from '../schema'

export function CreateAccountStep() {
  const form = useFormContext<OnboardingSchema>()

  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)
  const confirmPasswordRef = useRef<TextInput>(null)

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(JSON.stringify(data, null, 2))
  })

  return (
    <Step>
      <StepHeader>
        <StepTitle>Crie sua conta</StepTitle>
        <StepSubtitle>Preencha os dados abaixo para começar</StepSubtitle>
      </StepHeader>

      <StepContent>
        <View style={{ gap: 24 }}>
          <Controller
            control={form.control}
            name="account.name"
            render={({ field, fieldState }) => (
              <FormGroup
                label="Nome"
                error={fieldState.error?.message}
                style={{ width: '100%' }}
              >
                <Input
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="Seu nome"
                  autoCapitalize="words"
                  autoCorrect={false}
                  autoComplete="name"
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current?.focus()}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={form.control}
            name="account.email"
            render={({ field, fieldState }) => (
              <FormGroup
                label="E-mail"
                error={fieldState.error?.message}
                style={{ width: '100%' }}
              >
                <Input
                  ref={emailRef}
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="seu@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={form.control}
            name="account.password"
            render={({ field, fieldState }) => (
              <FormGroup
                label="Senha"
                error={fieldState.error?.message}
                style={{ width: '100%' }}
              >
                <Input
                  ref={passwordRef}
                  value={field.value}
                  onChangeText={field.onChange}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="new-password"
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={form.control}
            name="account.confirmPassword"
            render={({ field, fieldState }) => (
              <FormGroup
                label="Confirmar senha"
                error={fieldState.error?.message}
                style={{ width: '100%' }}
              >
                <Input
                  ref={confirmPasswordRef}
                  value={field.value}
                  onChangeText={field.onChange}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="new-password"
                  returnKeyType="done"
                  onSubmitEditing={onSubmit}
                />
              </FormGroup>
            )}
          />
        </View>
      </StepContent>

      <StepFooter align="start">
        <Button onPress={onSubmit}>Criar conta</Button>
      </StepFooter>
    </Step>
  )
}
