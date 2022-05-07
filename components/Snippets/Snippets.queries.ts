import { useMutation, useQueryClient } from 'react-query'

import type { SnippetDetail } from './Snippets.types'

export const snippetKeys = {
  all: [{ entity: 'snippets' }] as const,
  list: () => [{ ...snippetKeys.all[0], scope: 'list' }] as const,
  detail: (identifier?: string) =>
    [{ ...snippetKeys.all[0], scope: 'detail', identifier }] as const,
  comments: (identifier?: string) =>
    [{ ...snippetKeys.all[0], scope: 'comments', identifier }] as const
}

async function updateSnippet(data: Partial<SnippetDetail>) {
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
    onSuccess: (_data, args) => queryClient.invalidateQueries(snippetKeys.detail(args.slug))
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
    onSuccess: () => queryClient.invalidateQueries(snippetKeys.list())
  })
}
