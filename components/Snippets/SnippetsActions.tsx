import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'

import { useReactionMutation } from '@/hooks'

import { DeleteIcon, EditIcon, SpinnerIcon } from '@/icons'
import { LikeButton, Textarea, TextField } from '@/components'
import * as EditSnippet from './EditSnippetDialog'
import * as DeleteSnippet from './DeleteSnippetAlertDialog'

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
    <div className="flex gap-3">
      {session?.user.role === 'ADMIN' && (
        <>
          <DeleteSnippet.Root open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DeleteSnippet.Trigger>
              <DeleteIcon size={16} />
            </DeleteSnippet.Trigger>
            <DeleteSnippet.Content>
              <DeleteSnippet.Cancel disabled={deleteSnippet.isLoading}>
                Cancelar
              </DeleteSnippet.Cancel>
              <DeleteSnippet.Action
                disabled={deleteSnippet.isLoading}
                onClick={handleDeleteSnippet}
              >
                {deleteSnippet.isLoading && <SpinnerIcon />}
                Deletar snippet
              </DeleteSnippet.Action>
            </DeleteSnippet.Content>
          </DeleteSnippet.Root>

          <EditSnippet.Root open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <EditSnippet.Trigger aria-label="Editar snippet">
              <EditIcon size={16} />
            </EditSnippet.Trigger>
            <EditSnippet.Content>
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
            </EditSnippet.Content>
          </EditSnippet.Root>
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
  )
}
