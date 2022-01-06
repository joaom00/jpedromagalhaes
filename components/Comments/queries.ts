import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'

import type { Scope, Comment } from 'shared/types'

type CreateCommentData = {
  text: string
  keys: {
    scope: Scope
    identifier: string
  }
}

type UpdateCommentData = {
  scope: Scope
  comment: {
    id: string
    text: string
  }
}

type DeleteCommentData = {
  scope: Scope
  commentId: string
}

async function createComment({ text, keys: { scope, identifier } }: CreateCommentData) {
  const response = await fetch(`/api/${scope}/comments`, {
    method: 'POST',
    body: JSON.stringify({
      text,
      identifier
    })
  })

  if (!response.ok) {
    const { message } = await response.json()
    throw new Error(message)
  }

  return response.json()
}

export function useCreateCommentMutation() {
  const queryClient = useQueryClient()
  const { data: session } = useSession()

  return useMutation(createComment, {
    onMutate: async ({ text, keys: { scope, identifier } }) => {
      const key = [{ scope, identifier, type: 'comments' }]

      await queryClient.cancelQueries(key)

      const previousComments = queryClient.getQueryData<Comment[]>(key)

      const newComment = {
        text,
        createdAt: new Date(),
        author: {
          name: session?.user.name,
          image: session?.user.image
        }
      }

      queryClient.setQueryData<Array<typeof newComment>>(key, (oldComments) => {
        if (oldComments) {
          return [...oldComments, newComment]
        }

        return [newComment]
      })

      return previousComments
    },
    onSettled: (_data, _error, { keys: { scope, identifier } }) => {
      queryClient.invalidateQueries([{ type: 'comments', scope, identifier }])
    },
    onError: (_error, { keys: { scope, identifier } }, previousComments) => {
      queryClient.setQueryData([{ scope, identifier, type: 'comments' }], previousComments)
    }
  })
}

async function updateComment({ scope, comment }: UpdateCommentData) {
  const response = await fetch(`/api/${scope}/comments`, {
    method: 'PATCH',
    body: JSON.stringify(comment)
  })

  if (!response.ok) {
    const { message } = await response.json()
    throw new Error(message)
  }
}

export function useUpdateCommentMutation() {
  const queryClient = useQueryClient()

  return useMutation(updateComment, {
    onSuccess: (_data, { scope }) => queryClient.invalidateQueries([{ scope, type: 'comments' }])
  })
}

async function deleteComment({ scope, commentId }: DeleteCommentData) {
  const response = await fetch(`/api/${scope}/comments?id=${commentId}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    const { message } = await response.json()
    throw new Error(message)
  }
}

export function useDeleteCommentMutation(identifier?: string) {
  const queryClient = useQueryClient()

  return useMutation(deleteComment, {
    onSuccess: async (_data, { scope }) => {
      await queryClient.invalidateQueries([{ scope, identifier, type: 'comments' }])
      toast.success('Comentário deletado!')
    }
  })
}
