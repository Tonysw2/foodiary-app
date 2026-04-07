import { Button } from '@ui/components/button'
import { FormGroup } from '@ui/components/form-group'
import { Input } from '@ui/components/input'
import { useRef, useState } from 'react'
import { type TextInput, View } from 'react-native'
import {
  Step,
  StepContent,
  StepFooter,
  StepHeader,
  StepSubtitle,
  StepTitle,
} from '../components/steps'
import { useOnboarding } from '../contexts/onboarding-context'

export function CreateAccountStep() {
  const { nextStep } = useOnboarding()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)
  const confirmPasswordRef = useRef<TextInput>(null)

  return (
    <Step>
      <StepHeader>
        <StepTitle>Crie sua conta</StepTitle>
        <StepSubtitle>Preencha os dados abaixo para começar</StepSubtitle>
      </StepHeader>

      <StepContent>
        <View style={{ gap: 24 }}>
          <FormGroup label="Nome" style={{ width: '100%' }}>
            <Input
              value={name}
              onChangeText={setName}
              placeholder="Seu nome"
              autoCapitalize="words"
              autoCorrect={false}
              autoComplete="name"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
            />
          </FormGroup>

          <FormGroup label="E-mail" style={{ width: '100%' }}>
            <Input
              ref={emailRef}
              value={email}
              onChangeText={setEmail}
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
          </FormGroup>

          <FormGroup label="Senha" style={{ width: '100%' }}>
            <Input
              ref={passwordRef}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="new-password"
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            />
          </FormGroup>

          <FormGroup label="Confirmar senha" style={{ width: '100%' }}>
            <Input
              ref={confirmPasswordRef}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="new-password"
              returnKeyType="done"
              onSubmitEditing={nextStep}
            />
          </FormGroup>
        </View>
      </StepContent>

      <StepFooter align="start">
        <Button onPress={nextStep}>Criar conta</Button>
      </StepFooter>
    </Step>
  )
}
