import React from 'react'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { Prisma } from '@prisma/client'

import { PlusIcon, SpinnerIcon } from '@/icons'
import { Dialog, TextField } from '@/components'

export function AddSnippetDialog() {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const snippetMutation = useMutation(createSnippet, {
    onSuccess: () => queryClient.invalidateQueries([{ scope: 'snippets', type: 'list' }])
  })

  const [open, setOpen] = React.useState(false)

  async function createSnippet(values: { title: string; slug: string; logo: string }) {
    const response = await fetch('/api/snippets', {
      method: 'POST',
      body: JSON.stringify({ data: values })
    })

    if (!response.ok) {
      const { message } = await response.json()
      throw new Error(message)
    }
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (snippetMutation.isLoading) return

    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(formData.entries()) as unknown as Prisma.SnippetCreateInput

    snippetMutation.mutate(values, {
      onSuccess: () => {
        toast.success('Snippet criado!')
        setOpen(false)
      },
      onError: (error) => {
        if (error instanceof Error) {
          toast.error(error.message)
        }
      }
    })
  }
  if (session?.user.role === 'ADMIN') {
    return (
      <Dialog
        title="Adicione um snippet"
        description="Preencha os campos para adicionar um snippet. Clique em salvar quando terminar"
        open={open}
        onOpenChange={setOpen}
        trigger={<Trigger />}
      >
        <form className="grid grid-cols-2 gap-5" onSubmit={onSubmit}>
          <TextField name="title" placeholder="Título" required className="col-span-2" />
          <TextField name="slug" placeholder="Slug" required className="col-span-2" />
          <TextField name="logo" placeholder="Ícone" required className="col-span-2" />
          <div className="col-span-2 flex justify-end">
            <button
              // TODO:
              // disabled={!Boolean(values.title) && !Boolean(values.slug)}
              className="flex items-center gap-3 rounded-md bg-blue-500 py-2 px-4 text-white hover:opacity-95 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:opacity-50"
            >
              {snippetMutation.isLoading && <SpinnerIcon />}
              Adicionar snippet
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

Trigger.displayName = 'AddSnippetDialogTrigger'
