import React from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import {
  Action as AlertDialogAction,
  Cancel as AlertDialogCancel
} from '@radix-ui/react-alert-dialog'

import type { QuestionDetail } from '@/shared/types'
import { useReactionMutation } from '@/hooks'
import { useDeleteQuestionMutation, useUpdateQuestionMutation } from './Guestbook.queries'

import { DeleteIcon, EditIcon, SpinnerIcon } from '@/icons'
import { LikeButton, AlertDialog, TextField, Textarea, Dialog } from '@/components'

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

  function onReactionChange() {
    if (reactionMutation.isLoading) return
    reactionMutation.mutate({ scope: 'guestbook', identifier: question.id })
  }

  function onUpdateQuestion(event: React.FormEvent<HTMLFormElement>) {
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

  function onDeleteQuestion(event: React.MouseEvent) {
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
      <AlertDialog
        title="Você tem certeza disso?"
        description="Essa ação não poderá ser desfeita. A pergunta será excluída permanentemente."
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      >
        <div className="mt-5 flex justify-end gap-5">
          <AlertDialogCancel
            className="rounded-md bg-gray-250 py-2 px-3 hover:opacity-90 dark:bg-gray-700"
            disabled={deleteQuestion.isLoading}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="flex items-center gap-3 rounded-md bg-red-700 py-2 px-3 text-white hover:opacity-90"
            disabled={deleteQuestion.isLoading}
            onClick={onDeleteQuestion}
          >
            {deleteQuestion.isLoading && <SpinnerIcon />}
            Deletar pergunta
          </AlertDialogAction>
        </div>
      </AlertDialog>

      <Dialog
        title="Editar pergunta"
        description="Preencha os campos para fazer alguma alteração na pergunta. Clique em salvar quando terminar"
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      >
        <form className="grid grid-cols-2 gap-5" onSubmit={onUpdateQuestion}>
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
      </Dialog>

      <div className="flex gap-3">
        {question.canEdit && (
          <>
            <button
              onClick={() => setDeleteDialogOpen(true)}
              className="rounded-md px-3 text-sm text-red-500 transition duration-100 hover:bg-red-700 hover:text-white"
            >
              <DeleteIcon size={16} />
            </button>
            <button
              onClick={() => setEditDialogOpen(true)}
              className="rounded-md px-3 text-sm text-gray-900 transition duration-100 hover:bg-gray-250 dark:text-gray-100 dark:hover:bg-gray-700"
            >
              <EditIcon size={16} />
            </button>
          </>
        )}
        <LikeButton
          id={question.id}
          loading={reactionMutation.isLoading}
          count={question._count.reactions}
          hasReacted={question.hasReacted}
          onClick={onReactionChange}
        />
      </div>
    </>
  )
}
