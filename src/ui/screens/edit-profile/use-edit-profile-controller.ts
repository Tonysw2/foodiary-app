import { updateProfileMutationOptions } from '@app/lib/mutation-options/update-profile-mutation-options'
import { getAccountQueryOptions } from '@app/lib/query-options/get-account-query-options'
import type { AppStackNavigationProps } from '@app/navigation/app-stack/types'
import { useAuth } from '@app/providers/auth-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { Alert } from 'react-native'
import { type EditProfileSchema, editProfileSchema } from './schema'

export function useEditProfileController() {
  const navigation = useNavigation<AppStackNavigationProps>()

  const queryClient = useQueryClient()

  const { signOut } = useAuth()

  const { data: account } = useQuery(getAccountQueryOptions())

  const form = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: account?.profile.name ?? '',
      birthDate: account?.profile.birthDate ?? new Date().toISOString(),
      gender: account?.profile.gender,
      height: account?.profile.height ?? 0,
      weight: account?.profile.weight ?? 0,
    },
  })

  const mutation = useMutation(updateProfileMutationOptions(queryClient))

  function handleCancel() {
    navigation.goBack()
  }

  function handleSignOut() {
    signOut()
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await mutation.mutateAsync({
        name: data.name,
        birthDate: data.birthDate,
        gender: data.gender,
        height: data.height,
        weight: data.weight,
      })
      navigation.goBack()
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data)
      }
      Alert.alert('Erro ao atualizar perfil.')
    }
  })

  return {
    form,
    isPending: mutation.isPending,
    handleCancel,
    handleSignOut,
    handleSubmit,
  }
}
