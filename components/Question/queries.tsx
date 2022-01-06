import { useMutation, useQueryClient } from 'react-query'
import { QuestionDetail } from 'shared/types'

async function createQuestion(values: { title: string; description: string }) {
  const response = await fetch('/api/questions', {
    method: 'POST',
    body: JSON.stringify(values)
  })

  if (!response.ok) {
    const { message } = await response.json()
    throw new Error(message)
  }
}

export function useCreateQuestionMutation() {
  const queryClient = useQueryClient()

  return useMutation(createQuestion, {
    onSuccess: () => queryClient.invalidateQueries([{ scope: 'questions', type: 'list' }])
  })
}

async function updateQuestion(question: Pick<QuestionDetail, 'id' | 'title' | 'description'>) {
  const response = await fetch(`/api/questions/${question.id}`, {
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
      queryClient.invalidateQueries([{ scope: 'questions', type: 'detail', identifier: args.id }])
    }
  })
}

async function deleteQuestion(questionId: string) {
  const response = await fetch(`/api/questions/${questionId}`, {
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
    onSuccess: () => queryClient.invalidateQueries([{ scope: 'questions', type: 'list' }])
  })
}
