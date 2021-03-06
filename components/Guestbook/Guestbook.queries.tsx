import { useMutation, useQueryClient } from 'react-query'
import { Prisma, Question } from '@prisma/client'

import type { QuestionDetail } from './Guestbook.types'

export const guestbookKeys = {
  all: [{ entity: 'guestbook' }] as const,
  list: () => [{ ...guestbookKeys.all[0], scope: 'list' }] as const,
  detail: (identifier?: string) =>
    [{ ...guestbookKeys.all[0], scope: 'detail', identifier }] as const,
  comments: (identifier?: string) =>
    [{ ...guestbookKeys.all[0], scope: 'comments', identifier }] as const
}

async function createQuestion(values: Prisma.QuestionCreateInput): Promise<Question> {
  const response = await fetch('/api/guestbook', {
    method: 'POST',
    body: JSON.stringify(values)
  })

  if (!response.ok) {
    const { message } = await response.json()
    throw new Error(message)
  }

  const data = await response.json()
  return data
}

export function useCreateQuestionMutation() {
  const queryClient = useQueryClient()

  return useMutation(createQuestion, {
    onSuccess: () => queryClient.invalidateQueries(guestbookKeys.list())
  })
}

async function updateQuestion(question: Partial<QuestionDetail>) {
  const response = await fetch(`/api/guestbook/${question.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title: question.title,
      description: question.description
    })
  })

  if (!response.ok) {
    const { message } = await response.json()
    throw new Error(message)
  }
}

export function useUpdateQuestionMutation() {
  const queryClient = useQueryClient()

  return useMutation(updateQuestion, {
    onSuccess: (_data, args) => {
      queryClient.invalidateQueries(guestbookKeys.detail(args.id))
    }
  })
}

async function deleteQuestion(questionId: string) {
  const response = await fetch(`/api/guestbook/${questionId}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    const { message } = await response.json()
    throw new Error(message)
  }
}

export function useDeleteQuestionMutation() {
  const queryClient = useQueryClient()

  return useMutation(deleteQuestion, {
    onSuccess: () => queryClient.invalidateQueries(guestbookKeys.list())
  })
}
