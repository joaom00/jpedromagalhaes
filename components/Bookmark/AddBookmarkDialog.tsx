import React from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

import { useCreateBookmarkMutation } from './queries'

import { PlusIcon, SpinnerIcon } from 'icons'
import { Dialog, TextField, Textarea } from 'components'

export default function AddBookmarkDialog() {
  const { data } = useSession()
  const [open, setOpen] = React.useState(false)
  const [values, setValues] = React.useState({
    title: '',
    description: '',
    faviconUrl: '',
    host: '',
    url: ''
  })

  const createBookmark = useCreateBookmarkMutation()

  function handleInput(field: string, value: string) {
    setValues((s) => ({ ...s, [field]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (createBookmark.isLoading) return

    createBookmark.mutate(values, {
      onSuccess: () => {
        toast.success('Bookmark criado!')
        setOpen(false)
      }
    })
  }

  if (data?.user.role === 'ADMIN') {
    return (
      <Dialog
        title="Adicionar bookmark"
        description="Preencha os campos para adicionar um bookmark. Clique em salvar quando terminar"
        open={open}
        onOpenChange={setOpen}
        trigger={<Trigger />}
      >
        <form className="grid grid-cols-2 gap-5" onSubmit={handleSubmit}>
          <TextField name="title" placeholder="Título" required onInputChange={(v) => handleInput('title', v)} />
          <TextField name="url" placeholder="URL" required onInputChange={(v) => handleInput('url', v)} />
          <TextField name="host" placeholder="Host" required onInputChange={(v) => handleInput('host', v)} />
          <TextField
            name="faviconurl"
            placeholder="Favicon URL"
            required
            onInputChange={(v) => handleInput('faviconUrl', v)}
          />
          <Textarea
            name="description"
            placeholder="Descrição"
            required
            onInputChange={(v) => handleInput('description', v)}
            className="rounded-md bg-gray-200 dark:bg-gray-900 border-gray-250 dark:border-gray-700 col-span-2"
          />
          <div className="flex col-span-2">
            <button className="bg-blue-600 text-white rounded-md py-2 px-4 ml-auto flex items-center gap-3">
              {createBookmark.isLoading && <SpinnerIcon />}
              Criar bookmark
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

Trigger.displayName = 'AddBookmarkDialogTrigger'
