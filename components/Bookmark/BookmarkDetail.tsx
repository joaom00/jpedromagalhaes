import React from 'react'
import Image from 'next/image'
import Head from 'next/head'

import type { BookmarkDetail } from 'shared/types'
import { useDetailQuery } from 'shared/queries'

import { TitleBar } from 'components'
import { Comments } from 'components/Comments'

import BookmarkActions from './BookmarkActions'
import { useRouter } from 'next/router'

export default function BookmarkDetail() {
  const titleRef = React.useRef<HTMLHeadingElement>(null)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const router = useRouter()
  const id = router.query.id as string

  const bookmarkQuery = useDetailQuery<BookmarkDetail>('bookmarks', id)

  if (bookmarkQuery.isSuccess) {
    return (
      <>
        <Head>
          <title>{`Bookmarks | ${bookmarkQuery.data.title}`}</title>
        </Head>
        <div ref={scrollContainerRef} className="relative flex flex-col w-full max-h-screen overflow-y-auto">
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
              <span className="text-gray-400">{bookmarkQuery.data.host}</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-6">{bookmarkQuery.data.description}</p>
            <a
              href={bookmarkQuery.data.url}
              target="_blank"
              rel="noreferrer noopener"
              className="bg-blue-600 py-1.5 rounded-md text-white text-center mt-5 w-full block hover:bg-opacity-80 transition-all duration-200"
            >
              Visitar
            </a>
          </div>
          <Comments scope="bookmarks" identifier={id} scrollContainerRef={scrollContainerRef} />
        </div>
      </>
    )
  }

  return null
}
