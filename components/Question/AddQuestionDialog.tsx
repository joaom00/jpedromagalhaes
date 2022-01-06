import React from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

import { useSignInDialog } from 'contexts'

import { PlusIcon, SpinnerIcon } from 'icons'
import { Dialog, TextField, Textarea } from 'components'

import { useCreateQuestionMutation } from './queries'

export default function AddQuestionDialog() {
  const [open, setOpen] = React.useState(false)
  const [values, setValues] = React.useState({
    title: '',
    description: ''
  })

  const { data: session } = useSession()
  const signInDialog = useSignInDialog()
  const createQuestion = useCreateQuestionMutation()

  function handleInput(field: string, value: string) {
    setValues((s) => ({ ...s, [field]: value }))
  }

  function onCreateQuestion(event: React.FormEvent) {
    event.preventDefault()

    if (createQuestion.isLoading) return

    createQuestion.mutate(values, {
      onSuccess: () => {
        toast.success('Comentário adicionado!')
        setOpen(false)
      }
    })
  }

  function onTriggerClick() {
    if (session) {
      return setOpen(true)
    }
    signInDialog.setOpen(true)
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
        <TextField
          name="title"
          placeholder="Título"
          required
          onInputChange={(v) => handleInput('title', v)}
          className="col-span-2"
        />
        <Textarea
          name="description"
          rows={5}
          placeholder="(opcional) Adicione mais detalhes..."
          onInputChange={(v) => handleInput('description', v)}
          className="col-span-2"
        />
        <div className="flex col-span-2 justify-end">
          <button
            disabled={!Boolean(values.title.trim())}
            className="bg-blue-500 text-white rounded-md py-2 px-4 flex items-center gap-3 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-95"
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

const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(({ onTriggerClick, ...props }, ref) => {
  return (
    <button
      {...props}
      aria-label="Abrir modal para adicionar uma pergunta"
      onClick={onTriggerClick}
      ref={ref}
      className="p-2 rounded-md text-gray-700 dark:text-white bg-gray-200 bg-opacity-0 hover:bg-opacity-100 dark:bg-gray-800 dark:bg-opacity-0 dark:hover:bg-opacity-100 transition duration-200"
    >
      <PlusIcon />
    </button>
  )
})

Trigger.displayName = 'AddQuestionDialogTrigger'
