import {
  QueryFunctionContext,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient
} from 'react-query'
import { Prisma } from '@prisma/client'

import type { Bookmark, BookmarkDetail } from './Bookmarks.types'

export const bookmarkKeys = {
  all: [{ entity: 'bookmarks' }] as const,
  list: () => [{ ...bookmarkKeys.all[0], scope: 'list' }] as const,
  detail: (identifier: string) =>
    [{ ...bookmarkKeys.all[0], scope: 'detail', identifier }] as const,
  comments: (identifier: string) =>
    [{ ...bookmarkKeys.all[0], scope: 'comments', identifier }] as const
}

/* -------------------------------------------------------------------------------------------------
 * useBookmarksQuery
 * -----------------------------------------------------------------------------------------------*/

type BookmarkListData = {
  bookmarks: Bookmark[]
  nextCursor: string
}

type BookmarksContext = QueryFunctionContext<ReturnType<typeof bookmarkKeys['list']>, string>

export const fetchBookmarks = async (ctx: BookmarksContext): Promise<BookmarkListData> => {
  const [{ entity }] = ctx.queryKey
  const pageParam = ctx.pageParam

  const apiUrl = pageParam ? `/api/${entity}?cursor=${pageParam}` : `/api/${entity}`
  const response = await fetch(apiUrl)

  if (!response.ok) {
    throw new Error()
  }

  return await response.json()
}

export const useBookmarksQuery = () => {
  return useInfiniteQuery({
    queryKey: bookmarkKeys.list(),
    queryFn: fetchBookmarks,
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })
}

/* -------------------------------------------------------------------------------------------------
 * useBookmarkQuery
 * -----------------------------------------------------------------------------------------------*/

type BookmarkContext = QueryFunctionContext<ReturnType<typeof bookmarkKeys['detail']>, string>

export const fetchBookmark = async (ctx: BookmarkContext): Promise<BookmarkDetail> => {
  const [{ entity, identifier }] = ctx.queryKey
  const response = await fetch(`/api/${entity}/${identifier}`)

  if (!response.ok) {
    throw new Error()
  }

  const data = await response.json()
  return data
}

export const useBookmarkQuery = (id: string) => {
  return useQuery({
    queryKey: bookmarkKeys.detail(id),
    queryFn: fetchBookmark
  })
}

/* -------------------------------------------------------------------------------------------------
 * useCreateBookmarkMutation
 * -----------------------------------------------------------------------------------------------*/

export const useCreateBookmarkMutation = <T>() => {
  const createBookmark = async (values: Partial<BookmarkDetail>): Promise<T> => {
    const response = await fetch('/api/bookmarks', {
      method: 'POST',
      body: JSON.stringify({ data: values })
    })

    if (!response.ok) {
      const { message } = await response.json()
      throw new Error(message)
    }

    return await response.json()
  }

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createBookmark,
    onSuccess: () => queryClient.invalidateQueries(bookmarkKeys.list())
  })
}

/* -------------------------------------------------------------------------------------------------
 * useUpdateBookmarkMutation
 * -----------------------------------------------------------------------------------------------*/

export const useUpdateBookmarkMutation = () => {
  const updateBookmark = async (bookmark: Prisma.BookmarkUpdateInput) => {
    const response = await fetch(`/api/bookmarks/${bookmark.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...bookmark
      })
    })

    if (!response.ok) {
      const { message } = await response.json()
      throw new Error(message)
    }

    return await response.json()
  }

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateBookmark,
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries(bookmarkKeys.detail(id as string))
    }
  })
}

/* -------------------------------------------------------------------------------------------------
 * useDeleteBookmarkMutation
 * -----------------------------------------------------------------------------------------------*/

export const useDeleteBookmarkMutation = () => {
  const deleteBookmark = async (bookmarkId: string) => {
    const response = await fetch(`/api/bookmarks/${bookmarkId}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      const { message } = await response.json()
      throw new Error(message)
    }
  }

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteBookmark,
    onSuccess: () => queryClient.invalidateQueries(bookmarkKeys.list())
  })
}
