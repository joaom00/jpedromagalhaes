import React from 'react'
import { signIn } from 'next-auth/react'
import { Root, Portal, Overlay, Content, Description, Close } from '@radix-ui/react-dialog'

import { CloseIcon, GitbubIcon, GuestbookIcon, HeartFillIcon, TwitterIcon } from 'icons'

type SignInDialogProviderProps = {
  children: React.ReactNode
}

type SignInDialogContextData = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SignInDialogContext = React.createContext<SignInDialogContextData | undefined>(undefined)

// TODO: Move dialog outside provider
export default function SignInDialogProvider({ children }: SignInDialogProviderProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <SignInDialogContext.Provider value={{ open, setOpen }}>
      <Root open={open} onOpenChange={setOpen}>
        <Portal>
          <Overlay className="fixed inset-0 z-40 animate-overlayShow bg-black bg-opacity-60 backdrop-blur-sm backdrop-filter" />
          <Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 transform animate-contentShow rounded-md bg-white px-5 pt-10 pb-1 shadow-2xl dark:bg-mauveDark1">
            <Description>Ao criar uma conta, você poderá:</Description>
            <div className="mt-5 grid grid-cols-2 gap-5 text-center">
              <p className="grid place-items-center rounded-md bg-mauve3 p-6 font-semibold dark:bg-mauveDark3">
                <HeartFillIcon size={24} aria-hidden className="mb-2 text-slate11 dark:text-slateDark11" />
                Comentar e Curtir
              </p>
              <p className="grid place-items-center rounded-md bg-mauve3 p-6 font-semibold dark:bg-mauveDark3">
                <GuestbookIcon size={24} aria-hidden className="mb-2 text-slate11 dark:text-slateDark11" />
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

            <Close asChild>
              <button className="absolute top-3 right-3 rounded-md bg-mauve4 bg-opacity-0 p-2 transition duration-200 hover:bg-opacity-100 dark:bg-mauveDark4 dark:bg-opacity-0 dark:hover:bg-opacity-100">
                <CloseIcon />
              </button>
            </Close>
          </Content>
        </Portal>
      </Root>

      {children}
    </SignInDialogContext.Provider>
  )
}

export function useSignInDialog() {
  const context = React.useContext(SignInDialogContext)

  if (context === undefined) {
    throw new Error('useSignInDialog must be used within a SignInDialogProvider')
  }

  return context
}
