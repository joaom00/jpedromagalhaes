import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

import { SnippetDetail } from 'shared/types'
import { useReactionMutation } from 'hooks'
import { useUpdateSnippetMutation, useDeleteSnippetMutation } from './queries'

import { DeleteIcon, EditIcon, SpinnerIcon } from 'icons'
import { LikeButton, AlertDialog, TextField, Textarea, Dialog } from 'components'

type SnippetActionsProps = {
  snippet: SnippetDetail
}

export default function SnippetActions({ snippet }: SnippetActionsProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [editDialogOpen, setEditDialogOpen] = React.useState(false)
  const [values, setValues] = React.useState({
    title: snippet.title,
    slug: snippet.slug,
    logo: snippet.logo,
    description: snippet.description
  })

  const reactionMutation = useReactionMutation()
  const updateSnippet = useUpdateSnippetMutation()
  const deleteSnippet = useDeleteSnippetMutation()

  React.useEffect(() => {
    setValues(snippet)
  }, [snippet])

  function onReactionChange() {
    if (reactionMutation.isLoading) return
    reactionMutation.mutate({ scope: 'snippets', identifier: snippet.slug })
  }

  function handleInput(field: string, value: string) {
    setValues((s) => ({ ...s, [field]: value }))
  }

  function onUpdateSnippet(event: React.FormEvent) {
    event.preventDefault()

    if (updateSnippet.isLoading) return

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

  function onDeleteSnippet(event: React.MouseEvent) {
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
      <AlertDialog
        title="Você tem certeza disso?"
        description="Essa ação não poderá ser desfeita. O snippet será excluído permanentemente."
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      >
        <div className="flex justify-end mt-5 gap-5">
          <AlertDialogPrimitive.Cancel
            className="py-2 px-3 rounded-md bg-gray-250 dark:bg-gray-700 hover:opacity-90"
            disabled={deleteSnippet.isLoading}
          >
            Cancelar
          </AlertDialogPrimitive.Cancel>
          <AlertDialogPrimitive.Action
            className="py-2 px-3 rounded-md bg-red-700 text-white hover:opacity-90 flex items-center gap-3"
            disabled={deleteSnippet.isLoading}
            onClick={onDeleteSnippet}
          >
            {deleteSnippet.isLoading && <SpinnerIcon />}
            Deletar snippet
          </AlertDialogPrimitive.Action>
        </div>
      </AlertDialog>

      <Dialog
        title="Editar snippet"
        description="Edite o snippet"
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      >
        <form className="grid grid-cols-2 gap-5" onSubmit={onUpdateSnippet}>
          <TextField
            initialValue={snippet.title}
            name="title"
            placeholder="Título"
            required
            onInputChange={(v) => handleInput('title', v)}
          />
          <TextField
            initialValue={snippet.slug}
            name="slug"
            placeholder="Slug"
            required
            onInputChange={(v) => handleInput('slug', v)}
          />
          <TextField
            initialValue={snippet.logo}
            name="logo"
            placeholder="Logo"
            onInputChange={(v) => handleInput('logo', v)}
            className="col-span-2"
          />
          <Textarea
            initialValue={snippet.description as string}
            name="description"
            placeholder="Descrição"
            rows={3}
            onInputChange={(v) => handleInput('description', v)}
            className="col-span-2"
          />
          <div className="flex col-span-2 justify-end">
            <button
              className="bg-blue-500 text-white rounded-md py-2 px-4 flex items-center gap-3 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-95"
              disabled={JSON.stringify(snippet) === JSON.stringify(values)}
            >
              {updateSnippet.isLoading && <SpinnerIcon />}
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
          id={snippet.slug}
          loading={reactionMutation.isLoading}
          count={snippet._count.reactions}
          hasReacted={snippet.userHasReacted}
          onClick={onReactionChange}
        />
      </div>
    </>
  )
}
