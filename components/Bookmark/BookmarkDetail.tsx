import React from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import type { BookmarkDetail } from 'shared/types'
import { useDetailQuery } from 'shared/queries'

import { SpinnerIcon } from 'icons'
import { Container, TitleBar, Error } from 'components'

const BookmarkActions = dynamic(() => import('./BookmarkActions'))
const Comments = dynamic(() => import('components/Comments/Comments'))

export default function BookmarkDetail() {
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
          trailingAccessory={<BookmarkActions bookmark={bookmarkQuery.data} />}
          magicTitle
          titleRef={titleRef}
          scrollContainerRef={scrollContainerRef}
        />
        <div className="p-8">
          <div className="flex items-center">
            <h1 ref={titleRef} className="text-2xl lg:text-3xl font-semibold flex-1">
              {bookmarkQuery.data.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-2xl overflow-hidden">
              <Image
                src={bookmarkQuery.data.faviconUrl}
                alt={`Favicon do site ${bookmarkQuery.data.host}`}
                width={24}
                height={24}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-slate11 dark:text-slateDark11">{bookmarkQuery.data.host}</span>
          </div>
          <p className="text-slate11 dark:text-slateDark11 mt-6">{bookmarkQuery.data.description}</p>
          <a
            href={bookmarkQuery.data.url}
            target="_blank"
            rel="noreferrer noopener"
            className="bg-violet9 hover:bg-violet10 dark:bg-violetDark9 dark:hover:bg-violetDark10 text-violet12 dark:text-violetDark12 py-1.5 rounded-md text-center mt-5 w-full block  transition-all duration-200"
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
    <div className="grid place-items-center w-full">
      <SpinnerIcon />
    </div>
  )
}
