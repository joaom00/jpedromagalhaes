import { useMutation, useQueryClient } from 'react-query'

import type { StackDetail } from './Stack.types'

export const stackKeys = {
  all: [{ entity: 'stack' }] as const,
  list: () => [{ ...stackKeys.all[0], scope: 'list' }] as const,
  detail: (identifier?: string) => [{ ...stackKeys.all[0], scope: 'detail', identifier }] as const,
  comments: (identifier?: string) =>
    [{ ...stackKeys.all[0], scope: 'comments', identifier }] as const,
  users: (identifier?: string) => [{ ...stackKeys.all[0], scope: 'users', identifier }] as const
}

async function createStack(values: StackDetail) {
  const response = await fetch('/api/stack', {
    method: 'POST',
    body: JSON.stringify(values)
  })

  if (!response.ok) {
    const { message } = await response.json()
    throw new Error(message)
  }
}

export function useCreateStackMutation() {
  const queryClient = useQueryClient()

  return useMutation(createStack, {
    onSuccess: () => queryClient.invalidateQueries(stackKeys.list())
  })
}

async function updateStack(data: Partial<StackDetail>) {
  const response = await fetch(`/api/stack/${data.slug}`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: data.name,
      slug: data.slug,
      image: data.image,
      url: data.url,
      description: data.description
    })
  })

  if (!response.ok) {
    const { message } = await response.json()
    throw new Error(message)
  }
}

export function useUpdateStackMutation() {
  const queryClient = useQueryClient()

  return useMutation(updateStack, {
    onSuccess: (_data, args) => queryClient.invalidateQueries(stackKeys.detail(args.slug))
  })
}

async function deleteStack(slug: string) {
  const response = await fetch(`/api/stack/${slug}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    const { message } = await response.json()
    throw new Error(message)
  }
}

export function useDeleteStackMutation() {
  const queryClient = useQueryClient()

  return useMutation(deleteStack, {
    onSuccess: () => queryClient.invalidateQueries(stackKeys.list())
  })
}
