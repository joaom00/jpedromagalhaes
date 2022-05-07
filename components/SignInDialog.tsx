import * as Dialog from '@radix-ui/react-dialog'
import { signIn } from 'next-auth/react'

import { useStore } from '@/hooks'

import { CloseIcon, GitbubIcon, GuestbookIcon, HeartFillIcon, TwitterIcon } from '@/icons'

export function SignInDialog() {
  const open = useStore((state) => state.isSignInDialogOpen)
  const onOpenChange = useStore((state) => state.setIsSignInDialogOpen)

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 animate-overlayShow bg-black bg-opacity-60 backdrop-blur-sm backdrop-filter" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 transform animate-contentShow rounded-md bg-white px-5 pt-10 pb-1 shadow-2xl dark:bg-mauveDark1">
          <Dialog.Description>Ao criar uma conta, você poderá:</Dialog.Description>
          <div className="mt-5 grid grid-cols-2 gap-5 text-center">
            <p className="grid place-items-center rounded-md bg-mauve3 p-6 font-semibold dark:bg-mauveDark3">
              <HeartFillIcon
                size={24}
                aria-hidden
                className="mb-2 text-slate11 dark:text-slateDark11"
              />
              Comentar e Curtir
            </p>
            <p className="grid place-items-center rounded-md bg-mauve3 p-6 font-semibold dark:bg-mauveDark3">
              <GuestbookIcon
                size={24}
                aria-hidden
                className="mb-2 text-slate11 dark:text-slateDark11"
              />
              Utilizar Guestbook
            </p>
          </div>
          <div className="mt-7 space-y-5">
            <button
              className="flex w-full items-center justify-center gap-3 rounded-md bg-mauve3 py-3 font-semibold dark:bg-mauveDark3"
              onClick={() => signIn('github')}
            >
              <GitbubIcon aria-hidden />
              Entrar com GitHub
            </button>
            <button
              className="flex w-full items-center justify-center gap-3 rounded-md bg-mauve3 py-3 font-semibold dark:bg-mauveDark3"
              onClick={() => signIn('twitter')}
            >
              <TwitterIcon aria-hidden />
              Entrar com Twitter
            </button>
          </div>
          <div className="my-7 border-t border-mauve6 dark:border-mauveDark6">
            <p className="mt-5 text-sm font-semibold text-slate11 dark:text-slateDark11">
              Você poderá deletar sua conta a qualquer momento.
            </p>
          </div>

          <Dialog.Close asChild>
            <button className="absolute top-3 right-3 rounded-md bg-mauve4 bg-opacity-0 p-2 transition duration-200 hover:bg-opacity-100 dark:bg-mauveDark4 dark:bg-opacity-0 dark:hover:bg-opacity-100">
              <CloseIcon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
