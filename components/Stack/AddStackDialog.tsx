import React from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { Prisma } from '@prisma/client'

import { PlusIcon, SpinnerIcon } from '@/icons'
import { Dialog, TextField, Textarea } from '@/components'

import { useCreateStackMutation } from './Stack.queries'

export function AddStackDialog() {
  const { data } = useSession()
  const [open, setOpen] = React.useState(false)

  const createStack = useCreateStackMutation()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (createStack.isLoading) return

    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(formData.entries()) as unknown as Prisma.StackCreateInput

    createStack.mutate(values, {
      onSuccess: () => {
        toast.success('Ferramenta criada!')
        setOpen(false)
      }
    })
  }

  if (data?.user.role === 'ADMIN') {
    return (
      <Dialog
        title="Adicionar ferramenta"
        description="Preencha os campos para adicionar uma ferramenta. Clique em salvar quando terminar"
        open={open}
        onOpenChange={setOpen}
        trigger={<Trigger />}
      >
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <TextField name="name" placeholder="Nome" required />
          <TextField name="slug" placeholder="Slug" required />
          <TextField name="image" placeholder="Imagem" />
          <TextField name="url" placeholder="URL" required />
          <Textarea name="description" placeholder="Descrição" rows={3} className="col-span-2" />
          <div className="col-span-2 flex">
            <button className="ml-auto flex items-center gap-3 rounded-md bg-blue-500 py-2 px-4 text-white">
              {createStack.isLoading && <SpinnerIcon />}
              Adicionar
            </button>
          </div>
        </form>
      </Dialog>
    )
  }

  return null
}

const Trigger = React.forwardRef<HTMLButtonElement>((props, ref) => (
  <button
    {...props}
    ref={ref}
    className="rounded-md bg-gray-200 bg-opacity-0 p-2 text-gray-700 transition duration-200 hover:bg-opacity-100 dark:bg-gray-800 dark:bg-opacity-0 dark:text-white dark:hover:bg-opacity-100"
  >
    <PlusIcon />
  </button>
))

Trigger.displayName = 'AddStackDialogTrigger'
