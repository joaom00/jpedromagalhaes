import React from 'react'
import dynamic from 'next/dynamic'

import type { Snippet } from 'shared/types'
import { useListQuery } from 'shared/queries'
import { useIntersectionObserver } from 'hooks'

import { SpinnerIcon } from 'icons'
import { Container, TitleBar, Error } from 'components'

import SnippetItem from './SnippetListItem'

const AddSnippetDialog = dynamic(() => import('./AddSnippetDialog'))

type SnippetListData = {
  snippets: Snippet[]
  nextCursor: string
}

export default function SnippetList() {
  const endListRef = React.useRef<HTMLDivElement>(null)

  const snippetsQuery = useListQuery<SnippetListData>('snippets')

  useIntersectionObserver({
    elementRef: endListRef,
    onIntersect: snippetsQuery.fetchNextPage,
    enabled: snippetsQuery.hasNextPage
  })

  return (
    <Container
      title="Snippets - João Pedro Magalhães"
      customClassname="h-full border-r border-gray-200 md:w-80 xl:w-96 dark:border-gray-800 dark:bg-gray-900"
    >
      <TitleBar title="Snippets" trailingAccessory={<AddSnippetDialog />} />
      <ul className="p-3 space-y-1">
        {snippetsQuery.data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.snippets.map((snippet) => (
              <SnippetItem key={snippet.id} {...snippet} />
            ))}
          </React.Fragment>
        ))}
      </ul>

      {snippetsQuery.isLoading && (
        <div className="grid place-items-center pb-4">
          <SpinnerIcon />
        </div>
      )}

      {snippetsQuery.isError && <Error />}
      <div ref={endListRef} />
    </Container>
  )
}
