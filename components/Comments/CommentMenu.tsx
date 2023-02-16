import React from 'react'
import toast from 'react-hot-toast'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import type { Scope } from 'shared/types'

import { CloseIcon, OptionsIcon, SpinnerIcon } from 'icons'
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

  const handleUpdateComment = (event: React.FormEvent) => {
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

  const handleDeleteComment = (event: React.MouseEvent) => {
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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="ml-auto cursor-pointer rounded-md p-1 text-slate11 hover:bg-mauve4 dark:text-slateDark11 dark:hover:bg-mauveDark4">
        <OptionsIcon />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        hidden={editDialogOpen || deleteDialogOpen}
        side="left"
        align="start"
        className="w-32 animate-dropdownMenuShow rounded-md border border-mauve6 bg-mauve3 py-1.5 dark:border-mauveDark6 dark:bg-mauveDark3"
      >
        <Dialog.Root open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <Dialog.Trigger asChild>
            <DropdownMenu.Item
              className="flex cursor-pointer items-center rounded-sm py-1.5 pl-4 pr-7 text-sm outline-none focus:bg-violet4 dark:focus:bg-violetDark4"
              onSelect={(event) => event.preventDefault()}
            >
              Editar
            </DropdownMenu.Item>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Title>Editar comentário</Dialog.Title>
              <Dialog.Description>
                Após editar o comentário clique no botão para salvar as alterações.
              </Dialog.Description>
              <form className="space-y-5" onSubmit={handleUpdateComment}>
                <Textarea
                  name="comment"
                  className="w-full px-4 py-2"
                  rows={6}
                  initialValue={comment.text}
                  onInputChange={(v) => setValues((s) => ({ ...s, text: v }))}
                />
                <div className="col-span-2 flex justify-end">
                  <button
                    className="flex items-center gap-3 rounded-md bg-blue-500 py-2 px-4 text-white hover:opacity-95 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:opacity-50"
                    disabled={values.text === comment.text || !Boolean(values.text.trim())}
                  >
                    {updateComment.isLoading && <SpinnerIcon />}
                    Salvar alterações
                  </button>
                </div>
              </form>
              <Dialog.Close>
                <CloseIcon />
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <AlertDialog.Root open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialog.Trigger asChild>
            <DropdownMenu.Item
              className="flex cursor-pointer items-center rounded-sm py-1.5 pl-4 pr-7 text-sm outline-none focus:bg-violet4 dark:focus:bg-violetDark4"
              onSelect={(event) => event.preventDefault()}
            >
              Deletar
            </DropdownMenu.Item>
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <AlertDialog.Title>Você tem certeza disso?</AlertDialog.Title>
              <AlertDialog.Description>
                Essa ação não poderá ser desfeita. O comentário será excluído permanentemente.
              </AlertDialog.Description>
              <div className="mt-5 flex justify-end gap-5">
                <AlertDialog.Cancel disabled={deleteComment.isLoading}>Cancelar</AlertDialog.Cancel>
                <AlertDialog.Action onClick={handleDeleteComment}>
                  {deleteComment.isLoading && <SpinnerIcon />}
                  Deletar comentário
                </AlertDialog.Action>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
        <DropdownMenu.Arrow
          className="fill-mauve3 dark:fill-mauveDark3"
          width={13}
          height={8}
          offset={7}
        />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
