import React from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

import { useReactionMutation } from '@/hooks'
import { DeleteIcon, EditIcon, SpinnerIcon } from '@/icons'
import { LikeButton, TextField, Textarea } from '@/components'
import * as EditQuestion from './EditGuestbookDialog'
import * as DeleteQuestion from './DeleteQuestionAlertDialog'

import { useDeleteQuestionMutation, useUpdateQuestionMutation } from './Guestbook.queries'
import type { QuestionDetail } from './Guestbook.types'

type QuestionActionsProps = {
  question: QuestionDetail
}

export default function GuestbookActions({ question }: QuestionActionsProps) {
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [editDialogOpen, setEditDialogOpen] = React.useState(false)

  const reactionMutation = useReactionMutation()
  const updateQuestion = useUpdateQuestionMutation()
  const deleteQuestion = useDeleteQuestionMutation()

  const handleReactionChange = () => {
    if (reactionMutation.isLoading) return
    reactionMutation.mutate({ scope: 'guestbook', identifier: question.id })
  }

  const handleUpdateQuestion = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (updateQuestion.isLoading) return

    // TODO:
    // if (JSON.stringify(values) === JSON.stringify(question)) return

    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(formData.entries())

    updateQuestion.mutate(values, {
      onSuccess: () => {
        setEditDialogOpen(false)
        toast.success('Pergunta editada!')
      }
    })
  }

  const handleDeleteQuestion = (event: React.MouseEvent) => {
    event.preventDefault()
    if (deleteQuestion.isLoading) return

    deleteQuestion.mutate(question.id, {
      onSuccess: () => {
        setDeleteDialogOpen(false)
        router.push('/guestbook')
        toast.success('Pergunta deletada!')
      }
    })
  }

  return (
    <>
      <div className="flex gap-3">
        {question.canEdit && (
          <>
            <DeleteQuestion.Root open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DeleteQuestion.Trigger aria-label="Deletar pergunta">
                <DeleteIcon size={16} />
              </DeleteQuestion.Trigger>
              <DeleteQuestion.Content>
                <DeleteQuestion.Cancel disabled={deleteQuestion.isLoading}>
                  Cancelar
                </DeleteQuestion.Cancel>
                <DeleteQuestion.Action
                  disabled={deleteQuestion.isLoading}
                  onClick={handleDeleteQuestion}
                >
                  {deleteQuestion.isLoading && <SpinnerIcon />}
                  Deletar pergunta
                </DeleteQuestion.Action>
              </DeleteQuestion.Content>
            </DeleteQuestion.Root>

            <EditQuestion.Root open={editDialogOpen} onOpenChange={setEditDialogOpen}>
              <EditQuestion.Trigger aria-label="Editar pergunta">
                <EditIcon size={16} />
              </EditQuestion.Trigger>
              <EditQuestion.Content>
                <form className="grid grid-cols-2 gap-5" onSubmit={handleUpdateQuestion}>
                  <TextField
                    defaultValue={question.title}
                    name="title"
                    placeholder="Título"
                    required
                    className="col-span-2"
                  />
                  <Textarea
                    defaultValue={question.description as string}
                    name="description"
                    rows={5}
                    placeholder="(opcional) Adicione mais detalhes..."
                    className="col-span-2"
                  />
                  <div className="col-span-2 flex justify-end">
                    <button
                      // disabled={JSON.stringify(question) === JSON.stringify(values)}
                      className="flex items-center gap-3 rounded-md bg-blue-500 py-2 px-4 text-white hover:opacity-95 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:opacity-50"
                    >
                      {updateQuestion.isLoading && <SpinnerIcon />}
                      Salvar alterações
                    </button>
                  </div>
                </form>
              </EditQuestion.Content>
            </EditQuestion.Root>
          </>
        )}
        <LikeButton
          id={question.id}
          loading={reactionMutation.isLoading}
          count={question._count.reactions}
          hasReacted={question.hasReacted}
          onClick={handleReactionChange}
        />
      </div>
    </>
  )
}
