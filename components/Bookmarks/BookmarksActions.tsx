import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Prisma } from '@prisma/client'
import { toast } from 'react-hot-toast'
import {
  Action as AlertDialogAction,
  Cancel as AlertDialogCancel
} from '@radix-ui/react-alert-dialog'

import { useReactionMutation } from '@/hooks'

import { DeleteIcon, EditIcon, SpinnerIcon } from '@/icons'
import { LikeButton, AlertDialog, Textarea, TextField, Dialog } from '@/components'

import type { BookmarkDetail } from './Bookmarks.types'
import { useUpdateBookmarkMutation, useDeleteBookmarkMutation } from './Bookmarks.queries'

type BookmarksActionsProps = {
  bookmark: BookmarkDetail
}

export const BookmarksActions = ({ bookmark }: BookmarksActionsProps) => {
  const { data: session } = useSession()
  const router = useRouter()

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [editDialogOpen, setEditDialogOpen] = React.useState(false)

  const reactionMutation = useReactionMutation()
  const updateBookmark = useUpdateBookmarkMutation()
  const deleteBookmark = useDeleteBookmarkMutation()

  function onReactionChange() {
    if (reactionMutation.isLoading) return
    reactionMutation.mutate({ scope: 'bookmarks', identifier: bookmark.id })
  }

  function onUpdateBookmark(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(formData.entries()) as unknown as Prisma.BookmarkUpdateInput

    if (updateBookmark.isLoading) return

    updateBookmark.mutate(values, {
      onSuccess: () => {
        setEditDialogOpen(false)
        toast.success('Bookmark editado!')
      }
    })
  }

  function onDeleteBookmark(event: React.MouseEvent) {
    event.preventDefault()

    if (deleteBookmark.isLoading) return

    deleteBookmark.mutate(bookmark.id, {
      onSuccess: () => {
        setDeleteDialogOpen(false)
        router.push('/bookmarks')
        toast.success('Bookmark deletado!')
      }
    })
  }

  return (
    <>
      <AlertDialog
        title="Você tem certeza disso?"
        description="Essa ação não poderá ser desfeita. O bookmark será excluído permanentemente."
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      >
        <div className="mt-5 flex justify-end gap-5">
          <AlertDialogCancel
            className="rounded-md bg-gray-250 py-2 px-3 hover:opacity-90 dark:bg-gray-700"
            disabled={deleteBookmark.isLoading}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="flex items-center gap-3 rounded-md bg-red-700 py-2 px-3 text-white hover:opacity-90"
            disabled={deleteBookmark.isLoading}
            onClick={onDeleteBookmark}
          >
            {deleteBookmark.isLoading && <SpinnerIcon />}
            Deletar bookmark
          </AlertDialogAction>
        </div>
      </AlertDialog>

      <Dialog
        title="Editar pergunta"
        description="Preencha os campos para fazer alguma alteração na pergunta. Clique em salvar quando terminar"
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      >
        <form className="grid grid-cols-2 gap-5" onSubmit={onUpdateBookmark}>
          <TextField defaultValue={bookmark.title} name="title" placeholder="Título" required />
          <TextField defaultValue={bookmark.url} name="url" placeholder="URL" required />
          <TextField defaultValue={bookmark.host} name="host" placeholder="Host" required />
          <TextField
            defaultValue={bookmark.faviconUrl}
            name="faviconurl"
            placeholder="Favicon URL"
            required
          />
          <Textarea
            defaultValue={bookmark.description}
            name="description"
            placeholder="Descrição"
            required
            className="col-span-2 rounded-md border-gray-250 bg-gray-200 dark:border-gray-700 dark:bg-gray-900"
          />
          <div className="col-span-2 flex justify-end">
            <button
              // TODO:
              // disabled={JSON.stringify(bookmark) === JSON.stringify(values)}
              className="flex items-center gap-3 rounded-md bg-blue-500 py-2 px-4 text-white hover:opacity-95 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:opacity-50"
            >
              {updateBookmark.isLoading && <SpinnerIcon />}
              Salvar alterações
            </button>
          </div>
        </form>
      </Dialog>

      <div className="flex gap-3">
        {session?.user.role === 'ADMIN' && (
          <>
            <button
              onClick={() => setDeleteDialogOpen(true)}
              className="rounded-md px-3 text-sm text-slate11 transition duration-100 hover:bg-red-700 hover:text-white dark:text-slateDark11 dark:hover:text-white"
            >
              <DeleteIcon size={16} />
            </button>
            <button
              onClick={() => setEditDialogOpen(true)}
              className="rounded-md px-3 text-sm text-slate11 transition duration-100 hover:bg-mauve4 dark:text-slateDark11 dark:hover:bg-mauveDark4"
            >
              <EditIcon size={16} />
            </button>
          </>
        )}

        <LikeButton
          id={bookmark.id}
          loading={reactionMutation.isLoading}
          count={bookmark._count.reactions}
          hasReacted={bookmark.userHasReacted}
          onClick={onReactionChange}
        />
      </div>
    </>
  )
}
