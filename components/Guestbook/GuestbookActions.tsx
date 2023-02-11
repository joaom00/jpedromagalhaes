import React from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

import { useReactionMutation } from '@/hooks'

import { DeleteIcon, EditIcon, SpinnerIcon } from '@/icons'
import { LikeButton, AlertDialog, TextField, Textarea, Dialog } from '@/components'

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
            <AlertDialog.Root open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <AlertDialog.Trigger className="rounded-md px-3 text-sm text-red-500 transition duration-100 hover:bg-red-700 hover:text-white">
                <DeleteIcon size={16} />
              </AlertDialog.Trigger>
              <AlertDialog.Content
                title="Você tem certeza disso?"
                description="Essa ação não poderá ser desfeita. A pergunta será excluída permanentemente."
              >
                <div className="mt-5 flex justify-end gap-5">
                  <AlertDialog.Cancel
                    className="rounded-md bg-gray-250 py-2 px-3 hover:opacity-90 dark:bg-gray-700"
                    disabled={deleteQuestion.isLoading}
                  >
                    Cancelar
                  </AlertDialog.Cancel>
                  <AlertDialog.Action
                    className="flex items-center gap-3 rounded-md bg-red-700 py-2 px-3 text-white hover:opacity-90"
                    disabled={deleteQuestion.isLoading}
                    onClick={handleDeleteQuestion}
                  >
                    {deleteQuestion.isLoading && <SpinnerIcon />}
                    Deletar pergunta
                  </AlertDialog.Action>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Root>

            <Dialog.Root open={editDialogOpen} onOpenChange={setEditDialogOpen}>
              <Dialog.Trigger className="rounded-md px-3 text-sm text-gray-900 transition duration-100 hover:bg-gray-250 dark:text-gray-100 dark:hover:bg-gray-700">
                <EditIcon size={16} />
              </Dialog.Trigger>
              <Dialog.Content
                title="Editar pergunta"
                description="Preencha os campos para fazer alguma alteração na pergunta. Clique em salvar quando terminar"
              >
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
              </Dialog.Content>
            </Dialog.Root>
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
