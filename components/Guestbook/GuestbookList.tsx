import React from 'react'
import dynamic from 'next/dynamic'

import type { Question } from 'shared/types'
import { useListQuery } from 'shared/queries'
import { useIntersectionObserver } from 'hooks'

import { SpinnerIcon } from 'icons'
import { Container, TitleBar, Error } from 'components'

import GuestbookListItem from './GuestbookListItem'
const AddQuestionDialog = dynamic(() => import('./AddQuestionDialog'))

type QuestionListData = {
  questions: Question[]
  nextCursor: string
}

export default function GuestbookList() {
  const endListRef = React.useRef<HTMLDivElement>(null)

  const questionsQuery = useListQuery<QuestionListData>('guestbook')

  useIntersectionObserver({
    elementRef: endListRef,
    onIntersect: questionsQuery.fetchNextPage,
    enabled: questionsQuery.hasNextPage
  })

  return (
    <Container
      title="Guestbook - João Pedro Magalhães"
      customClassname="h-full border-r border-mauve6 dark:border-mauveDark6 md:w-80 xl:w-96 dark:bg-mauveDark1"
    >
      <TitleBar title="Guestbook" trailingAccessory={<AddQuestionDialog />} />
      <ul className="p-3 space-y-1">
        {questionsQuery.data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.questions.map((question) => (
              <GuestbookListItem key={question.id} {...question} />
            ))}
          </React.Fragment>
        ))}
      </ul>

      {questionsQuery.isLoading && (
        <div className="grid place-items-center pb-4">
          <SpinnerIcon />
        </div>
      )}

      {questionsQuery.isError && <Error />}
      <div ref={endListRef} />
    </Container>
  )
}
