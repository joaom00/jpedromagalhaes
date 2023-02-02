import React from 'react'
import { useRouter } from 'next/router'

import { useIntersectionObserver } from '@/hooks'
import { useListQuery } from '@/lib/useListQuery'

import { SpinnerIcon } from '@/icons'
import { Container, List, TitleBar, Error } from '@/components'

import type { Question } from './Guestbook.types'
import { GuestbookItem } from './GuestbookItem'
import { AddQuestionDialog } from './AddQuestionDialog'

type QuestionListData = {
  questions: Question[]
  nextCursor: string
}

export function Guestbook() {
  const router = useRouter()
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
      className="h-full border-r border-mauve6 dark:border-mauveDark6 dark:bg-mauveDark1 md:w-80 xl:w-96"
    >
      <TitleBar title="Guestbook" trailingAccessory={<AddQuestionDialog />} />

      <List.Root>
        {questionsQuery.data?.pages?.map((page, index) => (
          <React.Fragment key={index}>
            {page.questions.map((question) => (
              <List.Item
                key={question.id}
                href={`/guestbook/${question.id}`}
                isActive={router.asPath.indexOf(question.id) >= 0}
              >
                <GuestbookItem {...question} />
              </List.Item>
            ))}
          </React.Fragment>
        ))}
      </List.Root>

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
