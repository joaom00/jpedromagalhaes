import React from 'react'
import { useInfiniteQuery } from 'react-query'

import type { QueryKeys, Question } from 'shared/types'
import { fetchList } from 'shared/utils'
import { useIntersectionObserver } from 'hooks'

import { SpinnerIcon } from 'icons'
import { Container, TitleBar } from 'components'

import QuestionItem from './QuestionListItem'
import AddQuestionDialog from './AddQuestionDialog'

type QuestionData = {
  questions: Question[]
  nextCursor: string
}

export default function QuestionList() {
  const endListRef = React.useRef<HTMLDivElement>(null)
  const questionsQuery = useInfiniteQuery<QuestionData, unknown, QuestionData, QueryKeys>(
    [{ scope: 'questions', type: 'list' }],
    fetchList,
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor
    }
  )

  useIntersectionObserver({
    elementRef: endListRef,
    onIntersect: questionsQuery.fetchNextPage,
    enabled: questionsQuery.hasNextPage
  })

  return (
    <Container
      title="Guestbook - João Pedro Magalhães"
      customClassname="h-full border-r border-gray-200 md:w-80 xl:w-96 dark:border-gray-800 dark:bg-gray-900"
    >
      <TitleBar title="Guestbook" trailingAccessory={<AddQuestionDialog />} />
      <ul className="p-3 space-y-1">
        {questionsQuery.data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.questions.map(({ id, title, author }) => (
              <QuestionItem key={id} id={id} title={title} author={author} />
            ))}
          </React.Fragment>
        ))}
      </ul>
      {questionsQuery.isLoading && (
        <div className="grid place-items-center pb-4">
          <SpinnerIcon />
        </div>
      )}
      <div ref={endListRef} />
    </Container>
  )
}
