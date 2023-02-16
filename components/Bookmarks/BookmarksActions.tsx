import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Prisma } from '@prisma/client'
import { toast } from 'react-hot-toast'

import { useReactionMutation } from '@/hooks'
import { DeleteIcon, EditIcon, SpinnerIcon } from '@/icons'
import { LikeButton, Textarea, TextField } from '@/components'
import * as EditBookmark from './EditBookmarkDialog'
import * as DeleteBookmark from './DeleteBookmarkAlertDialog'

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
            <DeleteBookmark.Root open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DeleteBookmark.Trigger aria-label="Deletar bookmark">
                <DeleteIcon size={16} />
              </DeleteBookmark.Trigger>
              <DeleteBookmark.Content>
                <DeleteBookmark.Cancel disabled={deleteBookmark.isLoading}>
                  Cancelar
                </DeleteBookmark.Cancel>
                <DeleteBookmark.Action
                  disabled={deleteBookmark.isLoading}
                  onClick={handleDeleteBookmark}
                >
                  {deleteBookmark.isLoading && <SpinnerIcon />}
                  Deletar bookmark
                </DeleteBookmark.Action>
              </DeleteBookmark.Content>
            </DeleteBookmark.Root>

            <EditBookmark.Root open={editDialogOpen} onOpenChange={setEditDialogOpen}>
              <EditBookmark.Trigger aria-label="Editar bookmark">
                <EditIcon size={16} />
              </EditBookmark.Trigger>
              <EditBookmark.Content>
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
              </EditBookmark.Content>
            </EditBookmark.Root>
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
