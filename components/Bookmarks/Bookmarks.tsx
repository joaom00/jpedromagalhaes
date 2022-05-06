import React from 'react'
import { useRouter } from 'next/router'

import { useListQuery } from '@/lib/useListQuery'
import { useIntersectionObserver } from '@/hooks'

import { SpinnerIcon } from '@/icons'
import { Container, TitleBar, List, Error } from '@/components'

import { Bookmark } from './Bookmarks.queries'
import { BookmarksItem } from './BookmarksItem'
import { AddBookmarkDialog } from './AddBookmarkDialog'

type BookmarkListData = {
  bookmarks: Bookmark[]
  nextCursor: string
}

export const Bookmarks = () => {
  const router = useRouter()
  const endListRef = React.useRef<HTMLDivElement>(null)

  const bookmarksQuery = useListQuery<BookmarkListData>('bookmarks')

  useIntersectionObserver({
    elementRef: endListRef,
    onIntersect: bookmarksQuery.fetchNextPage,
    enabled: bookmarksQuery.hasNextPage
  })

  return (
    <Container
      title="Bookmarks - João Pedro Magalhães"
      customClassname="h-full border-r border-mauve6 dark:border-mauveDark6 md:w-80 xl:w-96 dark:bg-mauveDark1"
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
