import React from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { Action as AlertDialogAction, Cancel as AlertDialogCancel } from '@radix-ui/react-alert-dialog'

import type { QuestionDetail } from 'shared/types'
import { useReactionMutation } from 'hooks'
import { useDeleteQuestionMutation, useUpdateQuestionMutation } from './queries'

import { DeleteIcon, EditIcon, SpinnerIcon } from 'icons'
import { LikeButton, AlertDialog, TextField, Textarea, Dialog } from 'components'

type QuestionActionsProps = {
  question: QuestionDetail
}

export default function QuestionsActions({ question }: QuestionActionsProps) {
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [editDialogOpen, setEditDialogOpen] = React.useState(false)
  const [values, setValues] = React.useState({
    id: question.id,
    title: question.title,
    description: question.description
  })

  const reactionMutation = useReactionMutation()
  const updateQuestion = useUpdateQuestionMutation()
  const deleteQuestion = useDeleteQuestionMutation()

  React.useEffect(() => {
    setValues(question)
  }, [editDialogOpen, question])

  function onReactionChange() {
    if (reactionMutation.isLoading) return
    reactionMutation.mutate({ scope: 'questions', identifier: question.id })
  }

  function handleInput(field: string, value: string) {
    setValues((s) => ({ ...s, [field]: value }))
  }

  function onUpdateQuestion(event: React.FormEvent) {
    event.preventDefault()

    if (updateQuestion.isLoading) return

    if (JSON.stringify(values) === JSON.stringify(question)) return

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
        <div className="flex justify-end mt-5 gap-5">
          <AlertDialogCancel
            className="py-2 px-3 rounded-md bg-gray-250 dark:bg-gray-700 hover:opacity-90"
            disabled={deleteQuestion.isLoading}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="py-2 px-3 rounded-md bg-red-700 text-white hover:opacity-90 flex items-center gap-3"
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
            initialValue={question.title}
            name="title"
            placeholder="Título"
            required
            className="col-span-2"
            onInputChange={(v) => handleInput('title', v)}
          />
          <Textarea
            initialValue={question.description as string}
            onInputChange={(v) => handleInput('description', v)}
            name="description"
            rows={5}
            placeholder="(opcional) Adicione mais detalhes..."
            className="col-span-2"
          />
          <div className="flex col-span-2 justify-end">
            <button
              disabled={JSON.stringify(question) === JSON.stringify(values)}
              className="bg-blue-500 text-white rounded-md py-2 px-4 flex items-center gap-3 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-95"
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
              className="text-red-500 hover:text-white hover:bg-red-700 text-sm rounded-md px-3 transition duration-100"
            >
              <DeleteIcon size={16} />
            </button>
            <button
              onClick={() => setEditDialogOpen(true)}
              className="text-gray-900 dark:text-gray-100 hover:bg-gray-250 dark:hover:bg-gray-700 text-sm rounded-md px-3 transition duration-100"
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
