import React from 'react'
import dynamic from 'next/dynamic'

import type { Bookmark } from 'shared/types'
import { useListQuery } from 'shared/queries'
import { useIntersectionObserver } from 'hooks'

import { SpinnerIcon } from 'icons'
import { Container, TitleBar, Error } from 'components'

import BookmarkItem from './BookmarkListItem'

const AddBookmarkDialog = dynamic(() => import('./AddBookmarkDialog'))

type BookmarkListData = {
  bookmarks: Bookmark[]
  nextCursor: string
}

export default function BookmarkList() {
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
      <ul className="p-3 space-y-1">
        {bookmarksQuery.data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.bookmarks.map((bookmark) => (
              <BookmarkItem key={bookmark.id} {...bookmark} />
            ))}
          </React.Fragment>
        ))}
      </ul>

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
