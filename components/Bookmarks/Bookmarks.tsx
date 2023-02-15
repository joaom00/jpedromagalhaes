import React from 'react'
import { useRouter } from 'next/router'

import { useIntersectionObserver } from '@/hooks'

import { SpinnerIcon } from '@/icons'
import { Container, TitleBar, List, Error } from '@/components'

import { BookmarksItem } from './BookmarksItem'
import { AddBookmarkDialog } from './AddBookmarkDialog'
import { useBookmarksQuery } from './Bookmarks.queries'

export const Bookmarks = () => {
  const router = useRouter()
  const endListRef = React.useRef<HTMLDivElement>(null)

  const bookmarksQuery = useBookmarksQuery()

  useIntersectionObserver({
    elementRef: endListRef,
    onIntersect: bookmarksQuery.fetchNextPage,
    enabled: bookmarksQuery.hasNextPage
  })

  return (
    <Container
      title="Bookmarks - João Pedro Magalhães"
      className="h-full border-r border-gray-6 bg-gray-1 md:w-80 xl:w-96"
    >
      <TitleBar title="Bookmarks" trailingAccessory={<AddBookmarkDialog />} />

      <List.Root data-cy="bookmarks-list">
        {bookmarksQuery.data?.pages?.map((page, index) => (
          <React.Fragment key={index}>
            {page.bookmarks.map((bookmark) => (
              <List.Item
                key={bookmark.id}
                href={`/bookmarks/${bookmark.id}`}
                isActive={router.asPath.indexOf(bookmark.id) >= 0}
              >
                <BookmarksItem {...bookmark} />
              </List.Item>
            ))}
          </React.Fragment>
        ))}
      </List.Root>

      {bookmarksQuery.isLoading && (
        <div className="grid place-items-center pb-4">
          <SpinnerIcon />
        </div>
      )}

      {bookmarksQuery.isError && <Error />}

      <div ref={endListRef} />
    </Container>
  )
}
