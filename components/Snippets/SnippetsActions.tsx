import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'

import { useReactionMutation } from '@/hooks'

import { DeleteIcon, EditIcon, SpinnerIcon } from '@/icons'
import { LikeButton, AlertDialog, Textarea, TextField, Dialog } from '@/components'

import type { SnippetDetail } from './Snippets.types'
import { useUpdateSnippetMutation, useDeleteSnippetMutation } from './Snippets.queries'

type SnippetsActionsProps = {
  snippet: SnippetDetail
}

export function SnippetsActions({ snippet }: SnippetsActionsProps) {
  const router = useRouter()
  const { data: session } = useSession()

  const reactionMutation = useReactionMutation()
  const updateSnippet = useUpdateSnippetMutation()
  const deleteSnippet = useDeleteSnippetMutation()

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [editDialogOpen, setEditDialogOpen] = React.useState(false)

  const handleReactionChange = () => {
    if (reactionMutation.isLoading) return
    reactionMutation.mutate({ scope: 'snippets', identifier: snippet.slug })
  }

  const handleUpdateSnippet = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (updateSnippet.isLoading) return

    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(formData.entries()) as Partial<SnippetDetail>

    updateSnippet.mutate(values, {
      onSuccess: () => {
        setEditDialogOpen(false)
        toast.success('Snippet atualizado!')
      },
      onError: (error) => {
        if (error instanceof Error) {
          toast.error(error.message)
        }
      }
    })
  }

  const handleDeleteSnippet = (event: React.MouseEvent) => {
    event.preventDefault()
    if (deleteSnippet.isLoading) return

    deleteSnippet.mutate(snippet.slug, {
      onSuccess: () => {
        setDeleteDialogOpen(false)
        router.push('/snippets')
        toast.success('Snippet deletado!')
      },
      onError: (error) => {
        if (error instanceof Error) {
          toast.error(error.message)
        }
      }
    })
  }

  return (
    <>
      <div className="flex gap-3">
        {session?.user.role === 'ADMIN' && (
          <>
            <AlertDialog.Root open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <AlertDialog.Trigger className="rounded-md px-3 text-sm text-white transition duration-100 hover:bg-red-700">
                <DeleteIcon size={16} />
              </AlertDialog.Trigger>
              <AlertDialog.Content
                title="Você tem certeza disso?"
                description="Essa ação não poderá ser desfeita. O snippet será excluído permanentemente."
              >
                <div className="mt-5 flex justify-end gap-5">
                  <AlertDialog.Cancel
                    className="rounded-md bg-gray-250 py-2 px-3 hover:opacity-90 dark:bg-gray-700"
                    disabled={deleteSnippet.isLoading}
                  >
                    Cancelar
                  </AlertDialog.Cancel>
                  <AlertDialog.Action
                    className="flex items-center gap-3 rounded-md bg-red-700 py-2 px-3 text-white hover:opacity-90"
                    disabled={deleteSnippet.isLoading}
                    onClick={handleDeleteSnippet}
                  >
                    {deleteSnippet.isLoading && <SpinnerIcon />}
                    Deletar snippet
                  </AlertDialog.Action>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Root>
            <Dialog.Root open={editDialogOpen} onOpenChange={setEditDialogOpen}>
              <Dialog.Trigger className="rounded-md px-3 text-sm transition duration-100 hover:bg-gray-900">
                <EditIcon size={16} />
              </Dialog.Trigger>
              <Dialog.Content title="Editar snippet" description="Edite o snippet">
                <form className="grid grid-cols-2 gap-5" onSubmit={handleUpdateSnippet}>
                  <TextField
                    name="title"
                    placeholder="Título"
                    required
                    defaultValue={snippet.title}
                  />
                  <TextField name="slug" placeholder="Slug" required defaultValue={snippet.slug} />
                  <TextField
                    name="logo"
                    placeholder="Logo"
                    className="col-span-2"
                    defaultValue={snippet.logo}
                  />
                  <Textarea
                    name="description"
                    placeholder="Descrição"
                    rows={3}
                    className="col-span-2"
                    initialValue={snippet.description!}
                  />
                  <div className="col-span-2 flex justify-end">
                    <button
                      className="flex items-center gap-3 rounded-md bg-blue-500 py-2 px-4 text-white hover:opacity-95 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:opacity-50"
                      // TODO:
                      // disabled={JSON.stringify(snippet) === JSON.stringify(values)}
                    >
                      {updateSnippet.isLoading && <SpinnerIcon />}
                      Salvar alterações
                    </button>
                  </div>
                </form>
              </Dialog.Content>
            </Dialog.Root>
          </>
        )}
        <LikeButton
          id={snippet.slug}
          loading={reactionMutation.isLoading}
          count={snippet._count.reactions}
          hasReacted={snippet.userHasReacted}
          onClick={handleReactionChange}
        />
      </div>
    </>
  )
}
