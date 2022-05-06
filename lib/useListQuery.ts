import { QueryFunctionContext, useInfiniteQuery } from 'react-query'

type Entity = 'bookmarks' | 'guestbook' | 'snippets' | 'stack'

type Key = Readonly<
  {
    entity: Entity
    scope: 'list'
  }[]
>

type ListContext = QueryFunctionContext<Key, string>

export const fetchList = async (ctx: ListContext) => {
  const [{ entity }] = ctx.queryKey
  const pageParam = ctx.pageParam

  const apiUrl = pageParam
    ? `http://localhost:3000/api/${entity}?cursor=${pageParam}`
    : `http://localhost:3000/api/${entity}`
  const response = await fetch(apiUrl)

  if (!response.ok) {
    throw new Error()
  }

  return await response.json()
}

export const useListQuery = <T extends { nextCursor: string }>(entity: Entity) => {
  return useInfiniteQuery<T, Error, T, Key>([{ entity, scope: 'list' }], fetchList, {
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })
}
