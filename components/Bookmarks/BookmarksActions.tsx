import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Prisma } from '@prisma/client'
import { toast } from 'react-hot-toast'

import { useReactionMutation } from '@/hooks'

import { DeleteIcon, EditIcon, SpinnerIcon } from '@/icons'
import { LikeButton, AlertDialog, Textarea, TextField, Dialog } from '@/components'

import { useUpdateBookmarkMutation, useDeleteBookmarkMutation } from './Bookmarks.queries'

import type { BookmarkDetail } from './Bookmarks.types'

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

  const handleReactionChange = () => {
    if (reactionMutation.isLoading) return
    reactionMutation.mutate({ scope: 'bookmarks', identifier: bookmark.id })
  }

  const handleUpdateBookmark = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (updateBookmark.isLoading) return

    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(formData.entries()) as unknown as Prisma.BookmarkUpdateInput

    updateBookmark.mutate(values, {
      onSuccess: () => {
        setEditDialogOpen(false)
        toast.success('Bookmark editado!')
      }
    })
  }

  const handleDeleteBookmark = (event: React.MouseEvent) => {
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
      <div className="flex gap-3">
        {session?.user.role === 'ADMIN' && (
          <>
            <AlertDialog.Root open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <AlertDialog.Trigger className="rounded-md px-3 text-sm text-gray-11 transition duration-100 hover:bg-red-700 hover:text-white">
                <DeleteIcon size={16} />
              </AlertDialog.Trigger>
              <AlertDialog.Content
                title="Você tem certeza disso?"
                description="Essa ação não poderá ser desfeita. O bookmark será excluído permanentemente."
              >
                <div className="mt-5 flex justify-end gap-5">
                  <AlertDialog.Cancel
                    className="rounded-md bg-gray-3 py-2 px-3 hover:bg-gray-4"
                    disabled={deleteBookmark.isLoading}
                  >
                    Cancelar
                  </AlertDialog.Cancel>
                  <AlertDialog.Action
                    className="flex items-center gap-3 rounded-md bg-red-700 py-2 px-3 text-white hover:bg-red-600"
                    disabled={deleteBookmark.isLoading}
                    onClick={handleDeleteBookmark}
                  >
                    {deleteBookmark.isLoading && <SpinnerIcon />}
                    Deletar bookmark
                  </AlertDialog.Action>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Root>

            <Dialog.Root open={editDialogOpen} onOpenChange={setEditDialogOpen}>
              <Dialog.Trigger
                aria-label="Editar pergunta"
                className="rounded-md px-3 text-sm text-gray-11 transition duration-100 hover:bg-gray-4"
              >
                <EditIcon size={16} />
              </Dialog.Trigger>
              <Dialog.Content
                title="Editar pergunta"
                description="Preencha os campos para fazer alguma alteração na pergunta. Clique em salvar quando terminar"
              >
                <form className="grid grid-cols-2 gap-5" onSubmit={handleUpdateBookmark}>
                  <TextField
                    defaultValue={bookmark.title}
                    name="title"
                    placeholder="Título"
                    required
                  />
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
              </Dialog.Content>
            </Dialog.Root>
          </>
        )}

        <LikeButton
          id={bookmark.id}
          loading={reactionMutation.isLoading}
          count={bookmark._count.reactions}
          hasReacted={bookmark.userHasReacted}
          onClick={handleReactionChange}
        />
      </div>
    </>
  )
}
