import { useMutation, useQueryClient } from 'react-query'
import { Prisma } from '@prisma/client'

async function createStack(values: Prisma.StackCreateInput) {
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
    onSuccess: () => queryClient.invalidateQueries([{ entity: 'stack', scope: 'list' }])
  })
}

async function updateStack(data: Partial<Prisma.StackCreateInput>) {
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
    onSuccess: (_data, args) =>
      queryClient.invalidateQueries([{ entity: 'stack', scope: 'detail', identifier: args.slug }])
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
    onSuccess: () => queryClient.invalidateQueries([{ entity: 'stack', scope: 'list' }])
  })
}
