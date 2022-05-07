import React from 'react'
import { useRouter } from 'next/router'

import type { Stack } from './Stack.types'
import { useIntersectionObserver } from '@/hooks'
import { useListQuery } from '@/lib/useListQuery'

import { SpinnerIcon } from '@/icons'
import { Container, TitleBar, Error, List } from '@/components'

import { StackItem } from './StackItem'
import { AddStackDialog } from './AddStackDialog'

type StackData = {
  stack: Stack[]
  nextCursor: string
}

export function Stack() {
  const router = useRouter()
  const endListRef = React.useRef<HTMLDivElement>(null)

  const stackQuery = useListQuery<StackData>('stack')

  useIntersectionObserver({
    elementRef: endListRef,
    onIntersect: stackQuery.fetchNextPage,
    enabled: stackQuery.hasNextPage
  })

  return (
    <Container
      title="Stack - João Pedro Magalhães"
      customClassname="h-full border-r border-mauve6 dark:border-mauveDark6 md:w-80 xl:w-96 bg-mauve1 dark:bg-mauveDark1"
    >
      <TitleBar title="Stack" trailingAccessory={<AddStackDialog />} />

      <List.Root>
        {stackQuery.data?.pages?.map((page, index) => (
          <React.Fragment key={index}>
            {page.stack.map((stack) => (
              <List.Item
                key={stack.slug}
                href={`/stack/${stack.slug}`}
                isActive={router.asPath.indexOf(stack.slug) >= 0}
                className="!flex-row items-center gap-4"
              >
                <StackItem {...stack} />
              </List.Item>
            ))}
          </React.Fragment>
        ))}
      </List.Root>

      {stackQuery.isLoading && (
        <div className="grid place-items-center pb-4">
          <SpinnerIcon />
        </div>
      )}

      {stackQuery.isError && <Error />}
      <div ref={endListRef} />
    </Container>
  )
}
