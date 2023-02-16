import React from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

import { CloseIcon, PlusIcon, SpinnerIcon } from '@/icons'
import { Dialog, TextField, Textarea } from '@/components'

import { useCreateStackMutation } from './Stack.queries'
import type { StackDetail } from './Stack.types'

export function AddStackDialog() {
  const { data } = useSession()
  const createStack = useCreateStackMutation()

  const [open, setOpen] = React.useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (createStack.isLoading) return

    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(formData.entries()) as unknown as StackDetail

    createStack.mutate(values, {
      onSuccess: () => {
        toast.success('Ferramenta criada!')
        setOpen(false)
      }
    })
  }
  if (data?.user.role !== 'ADMIN') return null

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Adicionar stack"
        className="rounded-md p-2 text-gray-11 transition duration-200 hover:bg-gray-4 hover:text-gray-12"
      >
        <PlusIcon />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content>
          <Dialog.Title>Adicionar ferramenta</Dialog.Title>
          <Dialog.Description>
            Preencha os campos para adicionar uma ferramenta. Clique em salvar quando terminar
          </Dialog.Description>
          <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <TextField name="name" placeholder="Nome" required />
            <TextField name="slug" placeholder="Slug" required />
            <TextField name="image" placeholder="Imagem" />
            <TextField name="url" placeholder="URL" required />
            <Textarea name="description" placeholder="Descrição" rows={3} className="col-span-2" />
            <div className="col-span-2 flex">
              <button className="ml-auto flex items-center gap-3 rounded-md bg-blue-600 py-2 px-4 text-white transition-colors duration-150 hover:bg-blue-500">
                {createStack.isLoading && <SpinnerIcon />}
                Adicionar ferramenta
              </button>
            </div>
          </form>
          <Dialog.Close>
            <CloseIcon />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
