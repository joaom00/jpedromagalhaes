import { useMutation, useQueryClient } from 'react-query'
import { Prisma } from '@prisma/client'

import type { BookmarkDetail } from './Bookmarks.types'

export const bookmarkKeys = {
  all: [{ entity: 'bookmarks' }] as const,
  list: () => [{ ...bookmarkKeys.all[0], scope: 'list' }] as const,
  detail: (identifier: string) =>
    [{ ...bookmarkKeys.all[0], scope: 'detail', identifier }] as const,
  comments: (identifier: string) =>
    [{ ...bookmarkKeys.all[0], scope: 'comments', identifier }] as const
}

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

  return useMutation(createBookmark, {
    onSuccess: () => queryClient.invalidateQueries(bookmarkKeys.list())
  })
}

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

  return useMutation(updateBookmark, {
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries(bookmarkKeys.detail(id as string))
    }
  })
}

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

  return useMutation(deleteBookmark, {
    onSuccess: () => queryClient.invalidateQueries(bookmarkKeys.list())
  })
}
