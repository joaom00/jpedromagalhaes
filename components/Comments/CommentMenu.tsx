import React from 'react'
import toast from 'react-hot-toast'
// TODO: create DropdownMenu component
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Action as AlertDialogAction, Cancel as AlertDialogCancel } from '@radix-ui/react-alert-dialog'

import type { Scope } from 'shared/types'

import { OptionsIcon, SpinnerIcon } from 'icons'
import { Dialog, AlertDialog, Textarea } from 'components'

import { useUpdateCommentMutation, useDeleteCommentMutation } from './queries'

type CommentMenuProps = {
  scope: Scope
  identifier?: string
  comment: {
    id: string
    text: string
  }
}

export default function CommentMenu({ scope, identifier, comment }: CommentMenuProps) {
  const [editDialogOpen, setEditDialogOpen] = React.useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [values, setValues] = React.useState(comment)

  const updateComment = useUpdateCommentMutation()
  const deleteComment = useDeleteCommentMutation(identifier)

  React.useEffect(() => {
    setValues(comment)
  }, [editDialogOpen, comment])

  function onUpdateComment(event: React.FormEvent) {
    event.preventDefault()

    if (updateComment.isLoading) return

    updateComment.mutate(
      { scope, comment: values },
      {
        onSuccess: () => {
          setEditDialogOpen(false)
          toast.success('Comentário atualizado!')
        }
      }
    )
  }

  function onDeleteComment(event: React.MouseEvent) {
    event.preventDefault()

    if (deleteComment.isLoading) return

    deleteComment.mutate(
      { scope, commentId: comment.id },
      {
        onSuccess: () => {
          setDeleteDialogOpen(false)
        }
      }
    )
  }

  return (
    <>
      <AlertDialog
        title="Você tem certeza disso?"
        description="Essa ação não poderá ser desfeita. O comentário será excluído permanentemente."
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      >
        <div className="flex justify-end mt-5 gap-5">
          <AlertDialogCancel
            className="py-2 px-3 rounded-md bg-gray-250 dark:bg-gray-700 hover:opacity-90"
            disabled={deleteComment.isLoading}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="py-2 px-3 rounded-md bg-red-700 text-white hover:opacity-90 flex items-center gap-3"
            onClick={onDeleteComment}
          >
            {deleteComment.isLoading && <SpinnerIcon />}
            Deletar comentário
          </AlertDialogAction>
        </div>
      </AlertDialog>

      <Dialog
        title="Editar comentário"
        description="Após editar o comentário clique no botão para salvar as alterações."
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      >
        <form className="space-y-5" onSubmit={onUpdateComment}>
          <Textarea
            name="comment"
            className="w-full px-4 py-2"
            rows={6}
            initialValue={comment.text}
            onInputChange={(v) => setValues((s) => ({ ...s, text: v }))}
          />
          <div className="flex col-span-2 justify-end">
            <button
              className="bg-blue-500 text-white rounded-md py-2 px-4 flex items-center gap-3 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-95"
              disabled={values.text === comment.text || !Boolean(values.text.trim())}
            >
              {updateComment.isLoading && <SpinnerIcon />}
              Salvar alterações
            </button>
          </div>
        </form>
      </Dialog>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="ml-auto cursor-pointer hover:bg-gray-250 dark:hover:bg-gray-800 p-1 rounded-md">
          <OptionsIcon />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          side="left"
          align="start"
          className="bg-neutral-200 dark:bg-gray-900 rounded-md py-1.5 w-32 border border-neutral-300 dark:border-gray-800 animate-dropdownMenuShow"
        >
          <DropdownMenu.Item
            className="text-sm cursor-pointer focus:bg-blue-600 focus:text-white pl-4 pr-7 py-1.5 outline-none rounded-sm flex items-center"
            onSelect={() => setEditDialogOpen(true)}
          >
            Editar
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="text-sm cursor-pointer focus:bg-blue-600 focus:text-white pl-4 pr-7 py-1.5 outline-none rounded-sm flex items-center"
            onSelect={() => setDeleteDialogOpen(true)}
          >
            Deletar
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className="fill-gray-250 dark:fill-gray-900" width={13} height={8} offset={7} />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  )
}
