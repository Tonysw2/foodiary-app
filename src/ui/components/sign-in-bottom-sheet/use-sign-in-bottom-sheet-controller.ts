import { useAuth } from '@app/providers/auth-provider'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { useImperativeHandle, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, type TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { type SignInFormData, signInSchema } from './schema'

export function useSignInBottomSheetController(
  ref: React.Ref<{ open: () => void }>,
) {
  const { signIn } = useAuth()

  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const { bottom } = useSafeAreaInsets()

  useImperativeHandle(
    ref,
    () => ({
      open: () => bottomSheetRef.current?.present(),
    }),
    [],
  )

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await signIn(data)
    } catch {
      Alert.alert('Credenciais inválidas.')
    }
  })

  return {
    form,
    bottomSheetRef,
    passwordInputRef,
    bottom,
    onSubmit,
  }
}
