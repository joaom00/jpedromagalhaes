import React from 'react'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'

import { PlusIcon, SpinnerIcon } from 'icons'
import { Dialog, TextField } from 'components'

export default function AddSnippetDialog() {
  const { data: session } = useSession()
  const [open, setOpen] = React.useState(false)
  const [values, setValues] = React.useState({
    title: '',
    slug: '',
    logo: ''
  })
  const queryClient = useQueryClient()

  function handleInput(field: string, value: string) {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const snippetMutation = useMutation(createSnippet, {
    onSuccess: () => queryClient.invalidateQueries([{ scope: 'snippets', type: 'list' }])
  })

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (snippetMutation.isLoading) return

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
        <form className="grid grid-cols-2 gap-5" onSubmit={handleSubmit}>
          <TextField
            name="title"
            placeholder="Título"
            required
            onInputChange={(v) => handleInput('title', v)}
            className="col-span-2"
          />
          <TextField
            name="slug"
            placeholder="Slug"
            required
            onInputChange={(v) => handleInput('slug', v)}
            className="col-span-2"
          />
          <TextField
            name="logo"
            placeholder="Ícone"
            required
            onInputChange={(v) => handleInput('logo', v)}
            className="col-span-2"
          />
          <div className="flex col-span-2 justify-end">
            <button
              disabled={!Boolean(values.title) && !Boolean(values.slug)}
              className="bg-blue-500 text-white rounded-md py-2 px-4 flex items-center gap-3 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-95"
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
    className="p-2 rounded-md text-gray-700 dark:text-white bg-gray-200 bg-opacity-0 hover:bg-opacity-100 dark:bg-gray-800 dark:bg-opacity-0 dark:hover:bg-opacity-100 transition duration-200"
  >
    <PlusIcon />
  </button>
))

Trigger.displayName = 'AddSnippetDialogTrigger'
