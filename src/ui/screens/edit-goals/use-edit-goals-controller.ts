import { updateGoalsMutationOptions } from '@app/lib/mutation-options/update-goals-mutation-options'
import { getAccountQueryOptions } from '@app/lib/query-options/get-account-query-options'
import type { AppStackParamList } from '@app/navigation/app-stack/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { type EditGoalsSchema, editGoalsSchema } from './schema'

export function useEditGoalsController() {
  const { top, bottom } = useSafeAreaInsets()
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const queryClient = useQueryClient()

  const { data: account } = useQuery(getAccountQueryOptions())

  const form = useForm<EditGoalsSchema>({
    resolver: zodResolver(editGoalsSchema),
    defaultValues: {
      calories: String(account?.goal.calories ?? ''),
      carbohydrates: String(account?.goal.carbohydrates ?? ''),
      proteins: String(account?.goal.proteins ?? ''),
      fats: String(account?.goal.fats ?? ''),
    },
  })

  useEffect(() => {
    if (account?.goal) {
      form.reset({
        calories: String(account.goal.calories),
        carbohydrates: String(account.goal.carbohydrates),
        proteins: String(account.goal.proteins),
        fats: String(account.goal.fats),
      })
    }
  }, [account, form])

  const mutation = useMutation(updateGoalsMutationOptions(queryClient))

  function handleCancel() {
    navigation.goBack()
  }

  const handleSubmit = form.handleSubmit((data) => {
    mutation.mutate(
      {
        calories: parseFloat(data.calories),
        carbohydrates: parseFloat(data.carbohydrates),
        proteins: parseFloat(data.proteins),
        fats: parseFloat(data.fats),
      },
      {
        onSuccess: () => navigation.goBack(),
      },
    )
  })

  return {
    top,
    bottom,
    form,
    isPending: mutation.isPending,
    handleCancel,
    handleSubmit,
  }
}
