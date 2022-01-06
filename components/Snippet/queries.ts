import { useMutation, useQueryClient } from 'react-query'

type UpdateSnippetData = {
  title: string
  slug: string
  logo: string
  description: string | null
}

async function handleUpdateSnippet(data: UpdateSnippetData) {
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

  return useMutation(handleUpdateSnippet, {
    onSuccess: (_data, args) =>
      queryClient.invalidateQueries([{ scope: 'snippets', type: 'detail', identifier: args.slug }])
  })
}

async function handleDeleteSnippet(slug: string) {
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

  return useMutation(handleDeleteSnippet, {
    onSuccess: () => queryClient.invalidateQueries([{ scope: 'snippets', type: 'list' }])
  })
}
