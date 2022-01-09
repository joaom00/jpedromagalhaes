import React from 'react'
import dynamic from 'next/dynamic'
import { useInfiniteQuery } from 'react-query'

import type { QueryKeys, Stack } from 'shared/types'
import { fetchList } from 'shared/utils'
import { useIntersectionObserver } from 'hooks'

import { SpinnerIcon } from 'icons'
import { Container, TitleBar } from 'components'

import StackItem from './StackListItem'
const AddStackDialog = dynamic(() => import('./AddStackDialog'))

type StackData = {
  stack: Stack[]
  nextCursor: string
}

export default function StackList() {
  const endListRef = React.useRef<HTMLDivElement>(null)
  const stackQuery = useInfiniteQuery<StackData, unknown, StackData, QueryKeys>(
    [{ scope: 'stack', type: 'list' }],
    fetchList,
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor
    }
  )

  useIntersectionObserver({
    elementRef: endListRef,
    onIntersect: stackQuery.fetchNextPage,
    enabled: stackQuery.hasNextPage
  })

  return (
    <Container
      title="Stack - João Pedro Magalhães"
      customClassname="h-full border-r border-gray-200 md:w-80 xl:w-96 dark:border-gray-800 dark:bg-gray-900"
    >
      <TitleBar title="Stack" trailingAccessory={<AddStackDialog />} />

      <ul className="p-3 space-y-2">
        {stackQuery.data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.stack.map(({ name, slug, image }) => (
              <StackItem key={slug} name={name} slug={slug} image={image} />
            ))}
          </React.Fragment>
        ))}
      </ul>
      {stackQuery.isLoading && (
        <div className="grid place-items-center pb-4">
          <SpinnerIcon />
        </div>
      )}
      <div ref={endListRef} />
    </Container>
  )
}
