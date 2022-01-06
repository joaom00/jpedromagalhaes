import React from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

import { PlusIcon, SpinnerIcon } from 'icons'
import { Dialog, TextField, Textarea } from 'components'
import { useCreateStackMutation } from './queries'

export default function AddStackDialog() {
  const { data } = useSession()
  const [open, setOpen] = React.useState(false)
  const [values, setValues] = React.useState({
    name: '',
    slug: '',
    image: '',
    url: '',
    description: ''
  })

  const createStack = useCreateStackMutation()

  function handleInput(field: string, value: string) {
    setValues((s) => ({ ...s, [field]: value }))
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    if (createStack.isLoading) return

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
          <TextField name="name" placeholder="Nome" required onInputChange={(v) => handleInput('name', v)} />
          <TextField name="slug" placeholder="Slug" required onInputChange={(v) => handleInput('slug', v)} />
          <TextField name="image" placeholder="Imagem" onInputChange={(v) => handleInput('image', v)} />
          <TextField name="url" placeholder="URL" required onInputChange={(v) => handleInput('url', v)} />
          <Textarea
            name="description"
            placeholder="Descrição"
            rows={3}
            onInputChange={(v) => handleInput('description', v)}
            className="col-span-2"
          />
          <div className="flex col-span-2">
            <button className="bg-blue-500 text-white rounded-md py-2 px-4 ml-auto flex items-center gap-3">
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
    className="p-2 rounded-md text-gray-700 dark:text-white bg-gray-200 bg-opacity-0 hover:bg-opacity-100 dark:bg-gray-800 dark:bg-opacity-0 dark:hover:bg-opacity-100 transition duration-200"
  >
    <PlusIcon />
  </button>
))

Trigger.displayName = 'AddStackDialogTrigger'
