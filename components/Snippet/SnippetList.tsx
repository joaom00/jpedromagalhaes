import dynamic from 'next/dynamic'
import { useQuery } from 'react-query'

import type { QueryKeys, Snippet } from 'shared/types'
import { fetchList } from 'shared/utils'

import { Container, TitleBar } from 'components'

import SnippetItem from './SnippetListItem'
const AddSnippetDialog = dynamic(() => import('./AddSnippetDialog'))

export default function SnippetList() {
  const snippetsQuery = useQuery<Snippet[], unknown, Snippet[], QueryKeys>(
    [{ scope: 'snippets', type: 'list' }],
    fetchList
  )

  if (snippetsQuery.isSuccess) {
    return (
      <Container
        title="Snippets - João Pedro Magalhães"
        customClassname="h-full border-r border-gray-200 md:w-80 xl:w-96 dark:border-gray-800 dark:bg-gray-900"
      >
        <TitleBar title="Snippets" trailingAccessory={<AddSnippetDialog />} />
        <ul className="p-3 space-y-1">
          {snippetsQuery.data.map((snippet) => (
            <SnippetItem key={snippet.id} {...snippet} />
          ))}
        </ul>
      </Container>
    )
  }

  return null
}
