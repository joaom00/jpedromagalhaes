import { useMutation, useQueryClient } from 'react-query'
import { Prisma } from '@prisma/client'

async function updateSnippet(data: Prisma.SnippetUpdateInput) {
  const response = await fetch(`/api/snippets/${data.slug}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title: data.title,
      slug: data.slug,
      logo: data.logo,
      description: data.description
    })
  })

  if (!response.ok) {
    const { message } = await response.json()
    throw new Error(message)
  }
}

export function useUpdateSnippetMutation() {
  const queryClient = useQueryClient()

  return useMutation(updateSnippet, {
    onSuccess: (_data, args) =>
      queryClient.invalidateQueries([
        { entity: 'snippets', scope: 'detail', identifier: args.slug }
      ])
  })
}

async function deleteSnippet(slug: string) {
  const response = await fetch(`/api/snippets/${slug}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    const { message } = await response.json()
    throw new Error(message)
  }
}

export function useDeleteSnippetMutation() {
  const queryClient = useQueryClient()

  return useMutation(deleteSnippet, {
    onSuccess: () => queryClient.invalidateQueries([{ entity: 'snippets', scope: 'list' }])
  })
}
