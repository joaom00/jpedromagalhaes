import React from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { Prisma } from '@prisma/client'

import { useCreateBookmarkMutation } from './Bookmarks.queries'

import { CloseIcon, PlusIcon, SpinnerIcon } from '@/icons'
import { Dialog, TextField, Textarea } from '@/components'

export function AddBookmarkDialog() {
  const { data } = useSession()
  const createBookmark = useCreateBookmarkMutation()

  const [open, setOpen] = React.useState(false)

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

  if (data?.user.role !== 'ADMIN') return null

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="rounded-md p-2 text-gray-11 transition duration-200 hover:bg-gray-4 hover:text-gray-12"
        aria-label="Adicionar bookmark"
      >
        <PlusIcon />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Adicionar bookmark</Dialog.Title>
          <Dialog.Description>
            Preencha os campos para adicionar um bookmark. Clique em salvar quando terminar
          </Dialog.Description>
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
            <div className="col-span-2 flex justify-end">
              <button className="flex items-center gap-3 rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-500">
                {createBookmark.isLoading && <SpinnerIcon />}
                Criar bookmark
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
