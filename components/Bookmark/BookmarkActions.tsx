import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { Action as AlertDialogAction, Cancel as AlertDialogCancel } from '@radix-ui/react-alert-dialog'

import type { BookmarkDetail } from 'shared/types'
import { useReactionMutation } from 'hooks'
import { useUpdateBookmarkMutation, useDeleteBookmarkMutation } from './queries'

import { DeleteIcon, EditIcon, SpinnerIcon } from 'icons'
import { LikeButton, AlertDialog, Textarea, TextField, Dialog } from 'components'

type BookmarkActionsProps = {
  bookmark: BookmarkDetail
}

export default function BookmarkActions({ bookmark }: BookmarkActionsProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [editDialogOpen, setEditDialogOpen] = React.useState(false)
  const [values, setValues] = React.useState({
    id: bookmark.id,
    title: bookmark.title,
    description: bookmark.description,
    url: bookmark.url,
    host: bookmark.host,
    faviconUrl: bookmark.faviconUrl
  })

  const reactionMutation = useReactionMutation()
  const updateBookmark = useUpdateBookmarkMutation()
  const deleteBookmark = useDeleteBookmarkMutation()

  React.useEffect(() => {
    setValues(bookmark)
  }, [bookmark])

  function onReactionChange() {
    if (reactionMutation.isLoading) return
    reactionMutation.mutate({ scope: 'bookmarks', identifier: bookmark.id })
  }

  function handleInput(field: string, value: string) {
    setValues((s) => ({ ...s, [field]: value }))
  }

  function onUpdateBookmark(event: React.FormEvent) {
    event.preventDefault()

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
        <div className="flex justify-end mt-5 gap-5">
          <AlertDialogCancel
            className="py-2 px-3 rounded-md bg-gray-250 dark:bg-gray-700 hover:opacity-90"
            disabled={deleteBookmark.isLoading}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="py-2 px-3 rounded-md bg-red-700 text-white hover:opacity-90 flex items-center gap-3"
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
          <TextField
            initialValue={bookmark.title}
            name="title"
            placeholder="Título"
            required
            onInputChange={(v) => handleInput('title', v)}
          />
          <TextField
            initialValue={bookmark.url}
            name="url"
            placeholder="URL"
            required
            onInputChange={(v) => handleInput('url', v)}
          />
          <TextField
            initialValue={bookmark.host}
            name="host"
            placeholder="Host"
            required
            onInputChange={(v) => handleInput('host', v)}
          />
          <TextField
            initialValue={bookmark.faviconUrl}
            name="faviconurl"
            placeholder="Favicon URL"
            required
            onInputChange={(v) => handleInput('faviconUrl', v)}
          />
          <Textarea
            initialValue={bookmark.description}
            name="description"
            placeholder="Descrição"
            required
            onInputChange={(v) => handleInput('description', v)}
            className="rounded-md bg-gray-200 dark:bg-gray-900 border-gray-250 dark:border-gray-700 col-span-2"
          />
          <div className="flex col-span-2 justify-end">
            <button
              disabled={JSON.stringify(bookmark) === JSON.stringify(values)}
              className="bg-blue-500 text-white rounded-md py-2 px-4 flex items-center gap-3 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-95"
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
              className="hover:bg-red-700 text-sm rounded-md text-white px-3 transition duration-100"
            >
              <DeleteIcon size={16} />
            </button>
            <button
              onClick={() => setEditDialogOpen(true)}
              className="hover:bg-gray-900 text-sm rounded-md px-3 transition duration-100"
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
