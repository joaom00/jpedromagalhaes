import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { Action as AlertDialogAction, Cancel as AlertDialogCancel } from '@radix-ui/react-alert-dialog'

import type { StackDetail } from 'shared/types'
import { useReactionMutation } from 'hooks'
import { useUpdateStackMutation, useDeleteStackMutation } from './queries'

import { DeleteIcon, EditIcon, SpinnerIcon } from 'icons'
import { LikeButton, AlertDialog, TextField, Textarea, Dialog } from 'components'

type StackActionsProps = {
  stack: StackDetail
}

export default function StackActions({ stack }: StackActionsProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [editDialogOpen, setEditDialogOpen] = React.useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [values, setValues] = React.useState({
    name: stack.name,
    slug: stack.slug,
    image: stack.image,
    url: stack.url,
    description: stack.description
  })

  const reactionMutation = useReactionMutation()
  const updateStack = useUpdateStackMutation()
  const deleteStack = useDeleteStackMutation()

  React.useEffect(() => {
    setValues(stack)
  }, [editDialogOpen, stack])

  function handleInput(field: string, value: string) {
    setValues((s) => ({ ...s, [field]: value }))
  }

  function onReactionChange() {
    if (reactionMutation.isLoading) return

    reactionMutation.mutate({ scope: 'stack', identifier: stack.slug })
  }

  function onUpdateStack(event: React.FormEvent) {
    event.preventDefault()

    if (updateStack.isLoading) return

    updateStack.mutate(values, {
      onSuccess: () => {
        setEditDialogOpen(false)
        toast.success('Stack atualizada!')
      }
    })
  }

  function onDeleteStack(event: React.MouseEvent) {
    event.preventDefault()

    if (deleteStack.isLoading) return

    deleteStack.mutate(stack.slug, {
      onSuccess: () => {
        setDeleteDialogOpen(false)
        router.push('/stack')
        toast.success('Stack deletada!')
      }
    })
  }

  return (
    <>
      <AlertDialog
        title="Você tem certeza disso?"
        description="Essa ação não poderá ser desfeita. A stack será excluída permanentemente."
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      >
        <div className="flex justify-end mt-5 gap-5">
          <AlertDialogCancel
            className="py-2 px-3 rounded-md bg-gray-250 dark:bg-gray-700 hover:opacity-90"
            disabled={deleteStack.isLoading}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="py-2 px-3 rounded-md bg-red-700 text-white hover:opacity-90 flex items-center gap-3"
            disabled={deleteStack.isLoading}
            onClick={onDeleteStack}
          >
            {deleteStack.isLoading && <SpinnerIcon />}
            Deletar stack
          </AlertDialogAction>
        </div>
      </AlertDialog>

      <Dialog
        title="Atualizar stack"
        description="Preencha os campos para atualizar a stack. Clique em salvar quando terminar"
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      >
        <form className="grid grid-cols-2 gap-5" onSubmit={onUpdateStack}>
          <TextField
            initialValue={stack.name}
            name="name"
            placeholder="Nome"
            required
            onInputChange={(v) => handleInput('name', v)}
          />
          <TextField
            initialValue={stack.slug}
            name="slug"
            placeholder="Slug"
            required
            onInputChange={(v) => handleInput('slug', v)}
          />
          <TextField
            initialValue={stack.image}
            name="image"
            placeholder="Imagem"
            onInputChange={(v) => handleInput('image', v)}
          />
          <TextField
            initialValue={stack.url}
            name="url"
            placeholder="URL"
            required
            onInputChange={(v) => handleInput('url', v)}
          />
          <Textarea
            initialValue={stack.description}
            name="description"
            placeholder="Descrição"
            rows={3}
            onInputChange={(v) => handleInput('description', v)}
            className="col-span-2"
          />
          <div className="flex col-span-2 justify-end">
            <button
              className="bg-blue-500 text-white rounded-md py-2 px-4 flex items-center gap-3 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-95"
              disabled={JSON.stringify(stack) === JSON.stringify(values)}
            >
              {updateStack.isLoading && <SpinnerIcon />}
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
          id={stack.slug}
          loading={reactionMutation.isLoading}
          count={stack._count.reactions}
          hasReacted={stack.userHasReacted}
          onClick={onReactionChange}
        />
      </div>
    </>
  )
}
