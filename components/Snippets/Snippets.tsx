import React from 'react'
import { useRouter } from 'next/router'

import { useListQuery } from '@/hooks/useListQuery'
import { useIntersectionObserver } from '@/hooks'

import { SpinnerIcon } from '@/icons'
import { Container, TitleBar, Error, List } from '@/components'

import type { Snippet } from './Snippets.types'
import { SnippetsItem } from './SnippetsItem'
import { AddSnippetDialog } from './AddSnippetDialog'

type SnippetListData = {
  snippets: Snippet[]
  nextCursor: string
}

export function Snippets() {
  const router = useRouter()
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
      customClassname="h-full border-r border-mauve6 dark:border-mauveDark6 md:w-80 xl:w-96 bg-mauve1 dark:bg-mauveDark1"
    >
      <TitleBar title="Snippets" trailingAccessory={<AddSnippetDialog />} />

      <List.Root className="space-y-1 p-3">
        {snippetsQuery.data?.pages?.map((page, index) => (
          <React.Fragment key={index}>
            {page.snippets.map((snippet) => (
              <List.Item
                key={snippet.id}
                href={`/snippets/${snippet.slug}`}
                isActive={router.asPath.indexOf(snippet.slug) >= 0}
                className="!flex-row items-center gap-4"
              >
                <SnippetsItem {...snippet} />
              </List.Item>
            ))}
          </React.Fragment>
        ))}
      </List.Root>

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
