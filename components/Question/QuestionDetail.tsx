import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import type { QuestionDetail } from 'shared/types'
import { useDetailQuery } from 'shared/queries'

import { SpinnerIcon } from 'icons'
import { TitleBar } from 'components'
import { Comments } from 'components/Comments'

import QuestionActions from './QuestionActions'

export default function QuestionDetail() {
  const titleRef = React.useRef<HTMLHeadingElement>(null)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const router = useRouter()
  const id = router.query.id as string

  const questionQuery = useDetailQuery<QuestionDetail>('questions', id)

  if (questionQuery.isSuccess) {
    return (
      <>
        <Head>
          <title>{`Guestbook | ${questionQuery.data.title}`}</title>
        </Head>
        <div ref={scrollContainerRef} className="relative flex flex-col w-full max-h-screen overflow-y-auto">
          <TitleBar
            title={questionQuery.data.title}
            globalMenu={false}
            backButton
            backButtonHref="/guestbook"
            trailingAccessory={<QuestionActions question={questionQuery.data} />}
            magicTitle
            titleRef={titleRef}
            scrollContainerRef={scrollContainerRef}
          />
          <div className="p-8">
            <h1 ref={titleRef} className="text-3xl font-semibold flex-1">
              {questionQuery.data.title}
            </h1>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full overflow-hidden flex">
                <Image
                  src={questionQuery.data.author.image as string}
                  alt={`Foto de perfil de ${questionQuery.data.author.name}`}
                  width={24}
                  height={24}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-gray-400">{questionQuery.data.author.name}</span>
            </div>
            <p className="mt-3 text-gray-500 dark:text-gray-400 whitespace-pre-line">
              {questionQuery.data.description}
            </p>
          </div>
          <Comments scope="questions" identifier={id} scrollContainerRef={scrollContainerRef} />
        </div>
      </>
    )
  }

  if (questionQuery.isLoading) {
    return (
      <div className="grid place-items-center w-full">
        <SpinnerIcon />
      </div>
    )
  }

  return null
}
