import { accountQueryKeys } from '@app/lib/query-options/get-account-query-options'
import { AccountService } from '@app/services/account-service'
import type { QueryClient } from '@tanstack/react-query'
import { mutationOptions } from '@tanstack/react-query'

export const updateGoalsMutationOptions = (queryClient: QueryClient) =>
  mutationOptions({
    mutationFn: (payload: AccountService.UpdateGoalsPayload) =>
      AccountService.updateGoals(payload),
    onSuccess: () =>
      queryClient.refetchQueries({ queryKey: accountQueryKeys.all }),
  })
