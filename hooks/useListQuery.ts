import { QueryFunctionContext, useInfiniteQuery } from 'react-query'

type Key = Readonly<
  {
    entity: string
    scope: 'list'
  }[]
>

type ListContext = QueryFunctionContext<Key, string>

export const fetchList = async (ctx: ListContext) => {
  const [{ entity }] = ctx.queryKey
  const pageParam = ctx.pageParam

  const apiUrl = pageParam ? `/api/${entity}?cursor=${pageParam}` : `/api/${entity}`
  const response = await fetch(apiUrl)

  if (!response.ok) {
    throw new Error()
  }

  return await response.json()
}

export const useListQuery = <T extends { nextCursor: string }>(entity: string) => {
  return useInfiniteQuery<T, Error, T, Key>([{ entity, scope: 'list' }], fetchList, {
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })
}
