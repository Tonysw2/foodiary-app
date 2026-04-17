import { accountQueryKeys } from '@app/lib/query-options/get-account-query-options'
import { AccountService } from '@app/services/account-service'
import type { QueryClient } from '@tanstack/react-query'
import { mutationOptions } from '@tanstack/react-query'

export const updateProfileMutationOptions = (queryClient: QueryClient) =>
  mutationOptions({
    mutationFn: (payload: AccountService.UpdateProfilePayload) =>
      AccountService.updateProfile(payload),
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
            profile: {
              ...prev.profile,
              ...payload,
            },
          }
        },
      )

      return { oldAccountCache }
    },
    onError: (_err, _payload, context) => {
      if (context?.oldAccountCache) {
        queryClient.setQueryData(accountQueryKeys.all, context.oldAccountCache)
      }
    },
  })
