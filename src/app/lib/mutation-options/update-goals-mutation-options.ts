import { accountQueryKeys } from '@app/lib/query-options/get-account-query-options'
import type { AccountService } from '@app/services/account-service'
import { GoalsService } from '@app/services/goals-service'
import type { QueryClient } from '@tanstack/react-query'
import { mutationOptions } from '@tanstack/react-query'

export const updateGoalsMutationOptions = (queryClient: QueryClient) =>
  mutationOptions({
    mutationFn: (payload: GoalsService.UpdateGoalsPayload) =>
      GoalsService.updateGoals(payload),
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: accountQueryKeys.all })

      const oldAccountCache =
        queryClient.getQueryData<AccountService.GetMeResponse>(
          accountQueryKeys.all,
        )

      queryClient.setQueryData<AccountService.GetMeResponse>(
        accountQueryKeys.all,
        (prev) => {
          if (!prev) return prev

          return {
            ...prev,
            goal: {
              ...payload,
            },
          }
        },
      )

      return {
        oldAccountCache,
      }
    },
    onError: (_err, _payload, context) => {
      if (context?.oldAccountCache) {
        queryClient.setQueryData(accountQueryKeys.all, context.oldAccountCache)
      }
    },
  })
