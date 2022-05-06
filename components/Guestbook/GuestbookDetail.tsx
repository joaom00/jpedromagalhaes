import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'

import type { QuestionDetail } from '@/shared/types'

import { SpinnerIcon } from '@/icons'
import { Container, TitleBar, Error } from '@/components'
import { useDetailQuery } from '@/lib/useDetailQuery'

const Comments = dynamic(() => import('@/components/Comments/Comments'))
const QuestionActions = dynamic(() => import('./GuestbookActions'))

export function GuestbookDetail() {
  const titleRef = React.useRef<HTMLHeadingElement>(null)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const router = useRouter()
  const id = router.query.id as string

  const questionQuery = useDetailQuery<QuestionDetail>('guestbook', id)

  if (questionQuery.isSuccess) {
    return (
      <Container title={`Guestbook | ${questionQuery.data.title}`} ref={scrollContainerRef}>
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
          <h1 ref={titleRef} className="flex-1 text-3xl font-semibold">
            {questionQuery.data.title}
          </h1>
          <div className="flex items-center gap-2">
            <div className="flex h-4 w-4 overflow-hidden rounded-full">
              <Image
                src={questionQuery.data.author.image as string}
                alt={`Foto de perfil de ${questionQuery.data.author.name}`}
                width={24}
                height={24}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-slate11 dark:text-slateDark11">
              {questionQuery.data.author.name}
            </span>
          </div>
          <p className="mt-3 whitespace-pre-line text-slate11 dark:text-slateDark11">
            {questionQuery.data.description}
          </p>
        </div>
        <Comments scope="guestbook" identifier={id} scrollContainerRef={scrollContainerRef} />
      </Container>
    )
  }

  if (questionQuery.isError) {
    return <Error />
  }

  return (
    <div className="grid w-full place-items-center">
      <SpinnerIcon />
    </div>
  )
}
