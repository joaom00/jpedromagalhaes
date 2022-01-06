import { useMutation, useQueryClient } from 'react-query'
import { BookmarkDetail } from 'shared/types'
import { Prisma } from '@prisma/client'

async function handleCreateBookmark(values: Prisma.BookmarkCreateInput) {
  const response = await fetch('/api/bookmarks', {
    method: 'POST',
    body: JSON.stringify({ data: values })
  })

  if (!response.ok) {
    const { message } = await response.json()
    throw new Error(message)
  }
}

export function useCreateBookmarkMutation() {
  const queryClient = useQueryClient()
  return useMutation(handleCreateBookmark, {
    onSuccess: () => queryClient.invalidateQueries([{ scope: 'bookmarks', type: 'list' }])
  })
}

async function handleUpdateBookmark(bookmark: Omit<BookmarkDetail, '_count' | 'userHasReacted'>) {
  const response = await fetch(`/api/bookmarks/${bookmark.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title: bookmark.title,
      description: bookmark.description,
      host: bookmark.host,
      url: bookmark.url,
      faviconUrl: bookmark.faviconUrl
    })
  })

  if (!response.ok) {
    const { message } = await response.json()
    throw new Error(message)
  }
}

export function useUpdateBookmarkMutation() {
  const queryClient = useQueryClient()

  return useMutation(handleUpdateBookmark, {
    onSuccess: (_data, args) => {
      queryClient.invalidateQueries([{ scope: 'bookmarks', type: 'detail', identifier: args.id }])
    }
  })
}

async function handleDeleteBookmark(bookmarkId: string) {
  const response = await fetch(`/api/bookmarks/${bookmarkId}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    const { message } = await response.json()
    throw new Error(message)
  }
}

export function useDeleteBookmarkMutation() {
  const queryClient = useQueryClient()

  return useMutation(handleDeleteBookmark, {
    onSuccess: () => queryClient.invalidateQueries([{ scope: 'bookmarks', type: 'list' }])
  })
}
