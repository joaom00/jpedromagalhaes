import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'

import { useReactionMutation } from '@/hooks'
import { DeleteIcon, EditIcon, SpinnerIcon } from '@/icons'
import { LikeButton, TextField, Textarea } from '@/components'
import * as EditStack from './EditStackDialog'
import * as DeleteStack from './DeleteStackAlertDialog'

import { useUpdateStackMutation, useDeleteStackMutation } from './Stack.queries'
import type { StackDetail } from './Stack.types'

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
            <DeleteStack.Root open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DeleteStack.Trigger>
                <DeleteIcon size={16} />
              </DeleteStack.Trigger>
              <DeleteStack.Content>
                <DeleteStack.Cancel disabled={deleteStack.isLoading}>Cancelar</DeleteStack.Cancel>
                <DeleteStack.Action disabled={deleteStack.isLoading} onClick={handleDeleteStack}>
                  {deleteStack.isLoading && <SpinnerIcon />}
                  Deletar stack
                </DeleteStack.Action>
              </DeleteStack.Content>
            </DeleteStack.Root>

            <EditStack.Root open={editDialogOpen} onOpenChange={setEditDialogOpen}>
              <EditStack.Trigger aria-label="Editar stack">
                <EditIcon size={16} />
              </EditStack.Trigger>
              <EditStack.Content>
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
              </EditStack.Content>
            </EditStack.Root>
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
