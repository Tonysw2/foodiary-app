import { AccountService } from '@app/services/account-service'
import { queryOptions } from '@tanstack/react-query'

export const accountQueryKeys = {
  all: ['me'] as const,
}

export const accountQueryOptions = () =>
  queryOptions({
    queryKey: accountQueryKeys.all,
    queryFn: ({ signal }) => AccountService.getMe({ signal }),
    staleTime: Number.POSITIVE_INFINITY,
    enabled: false,
  })
