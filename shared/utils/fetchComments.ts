import { QueryFunctionContext } from 'react-query'
import type { QueryKeys, Comment } from 'shared/types'

export default async function fetchComments({ queryKey: [{ scope, identifier }] }: QueryFunctionContext<QueryKeys>) {
  const response = await fetch(`/api/${scope}/comments?identifier=${identifier}`)
  const data = await response.json()

  return data as Comment[]
}
