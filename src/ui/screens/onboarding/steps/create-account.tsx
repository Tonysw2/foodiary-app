import { useAuth } from '@app/providers/auth-provider'
import { Button } from '@ui/components/button'
import { FormGroup } from '@ui/components/form-group'
import { Input } from '@ui/components/input'
import { isAxiosError } from 'axios'
import { useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Alert, type TextInput, View } from 'react-native'
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
  const { signUp } = useAuth()
  const form = useFormContext<OnboardingSchema>()

  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)
  const confirmPasswordRef = useRef<TextInput>(null)

  const onSubmit = form.handleSubmit(async ({ account, profile }) => {
    try {
      await signUp({
        account: {
          email: account.email,
          password: account.password,
        },
        profile: {
          ...profile,
        },
      })
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response?.data?.code === 'EMAIL_ALREADY_IN_USE'
      ) {
        Alert.alert('Este e-mail já está em uso.')
        return
      }
      Alert.alert('Erro ao criar conta. Tente novamente.')
    }
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
            name="profile.name"
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
                  disabled={form.formState.isSubmitting}
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
                  disabled={form.formState.isSubmitting}
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
                  disabled={form.formState.isSubmitting}
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
                  disabled={form.formState.isSubmitting}
                />
              </FormGroup>
            )}
          />
        </View>
      </StepContent>

      <StepFooter align="start">
        <Button onPress={onSubmit} isLoading={form.formState.isSubmitting}>
          Criar conta
        </Button>
      </StepFooter>
    </Step>
  )
}
