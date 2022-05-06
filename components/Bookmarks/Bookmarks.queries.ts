import { useMutation, useQueryClient } from 'react-query'
import { Prisma } from '@prisma/client'

export type Bookmark = Prisma.BookmarkGetPayload<typeof bookmarksQuery>
export type BookmarkDetail = Prisma.BookmarkGetPayload<typeof bookmarkDetailQuery> & {
  userHasReacted: boolean
}

export const bookmarksQuery = Prisma.validator<Prisma.BookmarkArgs>()({
  select: {
    id: true,
    title: true,
    faviconUrl: true,
    host: true
  }
})

export const bookmarkDetailQuery = Prisma.validator<Prisma.BookmarkArgs>()({
  select: {
    id: true,
    title: true,
    description: true,
    faviconUrl: true,
    host: true,
    url: true,
    _count: {
      select: {
        reactions: true
      }
    }
  }
})

const bookmarkKeys = {
  all: [{ entity: 'bookmarks' }] as const,
  list: () => [{ ...bookmarkKeys.all[0], scope: 'list' }] as const,
  detail: (identifier: string) =>
    [{ ...bookmarkKeys.all[0], scope: 'detail', identifier }] as const,
  comments: (identifier: string) =>
    [{ ...bookmarkKeys.all[0], scope: 'comments', identifier }] as const
}

export const useCreateBookmarkMutation = <T>() => {
  const createBookmark = async (values: Prisma.BookmarkCreateInput): Promise<T> => {
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
