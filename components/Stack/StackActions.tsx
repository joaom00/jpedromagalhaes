import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'

import { useReactionMutation } from '@/hooks'

import { DeleteIcon, EditIcon, SpinnerIcon } from '@/icons'
import { LikeButton, AlertDialog, TextField, Textarea, Dialog } from '@/components'

import type { StackDetail } from './Stack.types'
import { useUpdateStackMutation, useDeleteStackMutation } from './Stack.queries'

type StackActionsProps = {
  stack: StackDetail
}

export function StackActions({ stack }: StackActionsProps) {
  const router = useRouter()
  const { data: session } = useSession()

  const reactionMutation = useReactionMutation()
  const updateStack = useUpdateStackMutation()
  const deleteStack = useDeleteStackMutation()

  const [editDialogOpen, setEditDialogOpen] = React.useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)

  const handleReactionChange = () => {
    if (reactionMutation.isLoading) return
    reactionMutation.mutate({ scope: 'stack', identifier: stack.slug })
  }

  const handleUpdateStack = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (updateStack.isLoading) return

    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(formData.entries())

    updateStack.mutate(values, {
      onSuccess: () => {
        setEditDialogOpen(false)
        toast.success('Stack atualizada!')
      }
    })
  }

  const handleDeleteStack = (event: React.MouseEvent) => {
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
      <div className="flex gap-3">
        {session?.user.role === 'ADMIN' && (
          <>
            <AlertDialog.Root open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <AlertDialog.Trigger className="rounded-md px-3 text-sm text-white transition duration-100 hover:bg-red-700">
                <DeleteIcon size={16} />
              </AlertDialog.Trigger>
              <AlertDialog.Content
                title="Você tem certeza disso?"
                description="Essa ação não poderá ser desfeita. A stack será excluída permanentemente."
              >
                <div className="mt-5 flex justify-end gap-5">
                  <AlertDialog.Cancel
                    className="rounded-md bg-gray-250 py-2 px-3 hover:opacity-90 dark:bg-gray-700"
                    disabled={deleteStack.isLoading}
                  >
                    Cancelar
                  </AlertDialog.Cancel>
                  <AlertDialog.Action
                    className="flex items-center gap-3 rounded-md bg-red-700 py-2 px-3 text-white hover:opacity-90"
                    disabled={deleteStack.isLoading}
                    onClick={handleDeleteStack}
                  >
                    {deleteStack.isLoading && <SpinnerIcon />}
                    Deletar stack
                  </AlertDialog.Action>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Root>

            <Dialog.Root open={editDialogOpen} onOpenChange={setEditDialogOpen}>
              <Dialog.Trigger className="rounded-md px-3 text-sm transition duration-100 hover:bg-gray-900">
                <EditIcon size={16} />
              </Dialog.Trigger>
              <Dialog.Content
                title="Atualizar stack"
                description="Preencha os campos para atualizar a stack. Clique em salvar quando terminar"
              >
                <form className="grid grid-cols-2 gap-5" onSubmit={handleUpdateStack}>
                  <TextField defaultValue={stack.name} name="name" placeholder="Nome" required />
                  <TextField defaultValue={stack.slug} name="slug" placeholder="Slug" required />
                  <TextField defaultValue={stack.image} name="image" placeholder="Imagem" />
                  <TextField defaultValue={stack.url} name="url" placeholder="URL" required />
                  <Textarea
                    initialValue={stack.description}
                    name="description"
                    placeholder="Descrição"
                    rows={3}
                    className="col-span-2"
                  />
                  <div className="col-span-2 flex justify-end">
                    <button
                      className="flex items-center gap-3 rounded-md bg-blue-500 py-2 px-4 text-white hover:opacity-95 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:opacity-50"
                      // TODO:
                      // disabled={JSON.stringify(stack) === JSON.stringify(values)}
                    >
                      {updateStack.isLoading && <SpinnerIcon />}
                      Salvar alterações
                    </button>
                  </div>
                </form>
              </Dialog.Content>
            </Dialog.Root>
          </>
        )}
        <LikeButton
          id={stack.slug}
          loading={reactionMutation.isLoading}
          count={stack._count.reactions}
          hasReacted={stack.userHasReacted}
          onClick={handleReactionChange}
        />
      </div>
    </>
  )
}
