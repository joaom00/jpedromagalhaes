import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useDetailQuery } from '@/lib/useDetailQuery'

import { SpinnerIcon } from '@/icons'
import { Container, TitleBar, Error } from '@/components'
import { Comments } from '@/components/Comments'

import type { BookmarkDetail } from './Bookmarks.types'
import { BookmarksActions } from './BookmarksActions'

export const BookmarksDetail = () => {
  const titleRef = React.useRef<HTMLHeadingElement>(null)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const router = useRouter()
  const id = router.query.id as string

  const bookmarkQuery = useDetailQuery<BookmarkDetail>('bookmarks', id)

  if (bookmarkQuery.isSuccess) {
    return (
      <Container title={`Bookmarks | ${bookmarkQuery.data.title}`} ref={scrollContainerRef}>
        <TitleBar
          title={bookmarkQuery.data.title}
          globalMenu={false}
          backButton
          backButtonHref="/bookmarks"
          trailingAccessory={<BookmarksActions bookmark={bookmarkQuery.data} />}
          magicTitle
          titleRef={titleRef}
          scrollContainerRef={scrollContainerRef}
        />
        <div className="p-8" data-cy="bookmark-detail">
          <div className="flex items-center">
            <h1 ref={titleRef} className="flex-1 text-2xl font-semibold lg:text-3xl">
              {bookmarkQuery.data.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 overflow-hidden rounded-2xl">
              <Image
                src={bookmarkQuery.data.faviconUrl}
                alt={`Favicon do site ${bookmarkQuery.data.host}`}
                width={24}
                height={24}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-slate11 dark:text-slateDark11">{bookmarkQuery.data.host}</span>
          </div>
          <p className="mt-6 text-slate11 dark:text-slateDark11">
            {bookmarkQuery.data.description}
          </p>
          <a
            href={bookmarkQuery.data.url}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-5 block w-full rounded-md bg-violet9 py-1.5 text-center text-violet12 transition-all duration-200 hover:bg-violet10 dark:bg-violetDark9  dark:text-violetDark12 dark:hover:bg-violetDark10"
          >
            Visitar
          </a>
        </div>
        <Comments scope="bookmarks" identifier={id} scrollContainerRef={scrollContainerRef} />
      </Container>
    )
  }

  if (bookmarkQuery.isError) {
    return <Error />
  }

  return (
    <div className="grid w-full place-items-center">
      <SpinnerIcon />
    </div>
  )
}
