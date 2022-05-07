import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { Prisma } from '@prisma/client'

import { useStore } from '@/hooks'
import { PlusIcon, SpinnerIcon } from '@/icons'
import { Dialog, TextField, Textarea } from '@/components'

import { useCreateQuestionMutation } from './Guestbook.queries'

export function AddQuestionDialog() {
  const openSignInDialog = useStore((state) => state.openSignInDialog)

  const router = useRouter()
  const { data: session } = useSession()
  const createQuestion = useCreateQuestionMutation()

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

  function onTriggerClick() {
    if (session) {
      return setOpen(true)
    }
    openSignInDialog()
  }

  return (
    <Dialog
      title="Adicione um comentário"
      description="Pode ser qualquer coisa, uma pergunta, informação, apreciação..."
      open={open}
      onOpenChange={setOpen}
      trigger={<Trigger onTriggerClick={onTriggerClick} />}
    >
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
            className="flex items-center gap-3 rounded-md bg-blue-500 py-2 px-4 text-white hover:opacity-95 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:opacity-50"
          >
            {createQuestion.isLoading && <SpinnerIcon />}
            Adicionar comentário
          </button>
        </div>
      </form>
    </Dialog>
  )
}

type TriggerProps = {
  onTriggerClick: () => void
}

const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  ({ onTriggerClick, ...props }, ref) => {
    return (
      <button
        {...props}
        aria-label="Abrir modal para adicionar uma pergunta"
        onClick={onTriggerClick}
        ref={ref}
        className="rounded-md bg-gray-200 bg-opacity-0 p-2 text-gray-700 transition duration-200 hover:bg-opacity-100 dark:bg-gray-800 dark:bg-opacity-0 dark:text-white dark:hover:bg-opacity-100"
      >
        <PlusIcon />
      </button>
    )
  }
)

Trigger.displayName = 'AddQuestionDialogTrigger'
