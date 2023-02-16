import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { Prisma } from '@prisma/client'

import { useStore } from '@/hooks'
import { CloseIcon, PlusIcon, SpinnerIcon } from '@/icons'
import { Dialog, TextField, Textarea } from '@/components'

import { useCreateQuestionMutation } from './Guestbook.queries'

export function AddQuestionDialog() {
  const router = useRouter()
  const { data: session } = useSession()
  const createQuestion = useCreateQuestionMutation()
  const openSignInDialog = useStore((state) => state.openSignInDialog)

  const [open, setOpen] = React.useState(false)

  function onCreateQuestion(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (createQuestion.isLoading) return

    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(formData.entries()) as unknown as Prisma.QuestionCreateInput

    createQuestion.mutate(values, {
      onSuccess: (question) => {
        router.push(`/guestbook/${question.id}`)
        toast.success('Comentário adicionado!')
        setOpen(false)
      }
    })
  }

  const handleClick = () => {
    if (session) return setOpen(true)
    openSignInDialog()
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Abrir modal para adicionar uma pergunta"
        onClick={handleClick}
        className="rounded-md p-2 text-gray-11 transition duration-200 hover:bg-gray-4 hover:text-gray-12"
      >
        <PlusIcon />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content>
          <Dialog.Title>Adicione um comentário</Dialog.Title>
          <Dialog.Description>
            Pode ser qualquer coisa, uma pergunta, informação, apreciação...
          </Dialog.Description>
          <form className="grid grid-cols-2 gap-5" onSubmit={onCreateQuestion}>
            <TextField name="title" placeholder="Título" required className="col-span-2" />
            <Textarea
              name="description"
              rows={5}
              placeholder="(opcional) Adicione mais detalhes..."
              className="col-span-2"
            />
            <div className="col-span-2 flex justify-end">
              <button
                // TODO:
                // disabled={!Boolean(values.title.trim())}
                className="flex items-center gap-3 rounded-md bg-blue-600 py-2 px-4 text-white transition-colors duration-150 hover:bg-blue-500 disabled:cursor-not-allowed"
              >
                {createQuestion.isLoading && <SpinnerIcon />}
                Adicionar comentário
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
