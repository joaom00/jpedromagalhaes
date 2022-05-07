import { QueryFunctionContext, useQuery } from 'react-query'

interface DetailQuery {
  entity: string
  scope: string
  identifier?: string
}

const detailKeys = (entity: string, identifier: string): DetailQuery[] => [
  { entity, identifier, scope: 'detail' }
]

export const fetchDetail = async (ctx: QueryFunctionContext<Readonly<DetailQuery[]>>) => {
  const [{ entity, identifier }] = ctx.queryKey
  const response = await fetch(`/api/${entity}/${identifier}`)

  if (!response.ok) {
    throw new Error()
  }

  const data = await response.json()

  return data
}

export const useDetailQuery = <T = any>(scope: string, identifier: string) => {
  return useQuery<T, Error, T, DetailQuery[]>(detailKeys(scope, identifier), fetchDetail)
}
