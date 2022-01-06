import { QueryFunctionContext } from 'react-query'
import { QueryKeys } from 'shared/types'

export default async function fetchList({ queryKey: [{ scope }], pageParam }: QueryFunctionContext<QueryKeys, string>) {
  const apiUrl = pageParam ? `/api/${scope}?cursor=${pageParam}` : `/api/${scope}`
  const response = await fetch(apiUrl)
  const data = await response.json()

  return data
}
