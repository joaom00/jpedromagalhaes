import { QueryFunctionContext, useQuery } from 'react-query'

import type { Scope } from '@/shared/types'

const detailKeys = (entity: Scope, identifier: string) =>
  [{ entity, identifier, scope: 'detail' }] as const

export const fetchDetail = async ({
  queryKey: [{ entity, identifier }]
}: QueryFunctionContext<ReturnType<typeof detailKeys>>) => {
  const response = await fetch(`/api/${entity}/${identifier}`)

  if (!response.ok) {
    throw new Error()
  }

  const data = await response.json()

  return data
}

export const useDetailQuery = <T = any>(scope: Scope, identifier: string) => {
  return useQuery<T, Error, T, ReturnType<typeof detailKeys>>(
    detailKeys(scope, identifier),
    fetchDetail
  )
}
