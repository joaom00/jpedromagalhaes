import React from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { Prisma } from '@prisma/client'

import { useCreateBookmarkMutation } from './Bookmarks.queries'

import { PlusIcon, SpinnerIcon } from '@/icons'
import { Dialog, TextField, Textarea } from '@/components'

export function AddBookmarkDialog() {
  const { data } = useSession()
  const [open, setOpen] = React.useState(false)

  const createBookmark = useCreateBookmarkMutation()

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (createBookmark.isLoading) return

    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(formData.entries()) as unknown as Prisma.BookmarkCreateInput

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
        <form className="grid grid-cols-2 gap-5" onSubmit={onSubmit}>
          <TextField name="title" placeholder="Título" required />
          <TextField name="url" placeholder="URL" required />
          <TextField name="host" placeholder="Host" required />
          <TextField name="faviconUrl" placeholder="Favicon URL" required />
          <Textarea
            name="description"
            placeholder="Descrição"
            required
            className="col-span-2 rounded-md"
          />
          <div className="col-span-2 flex">
            <button className="ml-auto flex items-center gap-3 rounded-md bg-blue-600 py-2 px-4 text-white">
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
    className="rounded-md bg-gray-200 bg-opacity-0 p-2 text-gray-700 transition duration-200 hover:bg-opacity-100 dark:bg-gray-800 dark:bg-opacity-0 dark:text-white dark:hover:bg-opacity-100"
    aria-label="Adicionar bookmark"
    {...props}
    ref={ref}
  >
    <PlusIcon />
  </button>
))

Trigger.displayName = 'AddBookmarkDialogTrigger'
