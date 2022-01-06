import React from 'react'
import { signIn } from 'next-auth/react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

import { CloseIcon, GitbubIcon, TwitterIcon } from 'icons'

type SignInDialogProviderProps = {
  children: React.ReactNode
}

type SignInDialogContextData = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SignInDialogContext = React.createContext<SignInDialogContextData | undefined>(undefined)

export default function SignInDialogProvider({ children }: SignInDialogProviderProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <SignInDialogContext.Provider value={{ open, setOpen }}>
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="bg-black bg-opacity-60 fixed inset-0 animate-overlayShow backdrop-filter backdrop-blur-sm z-40" />
          <DialogPrimitive.Content className="bg-white shadow-2xl dark:bg-gray-900 rounded-md max-w-lg w-full pt-10 pb-1 px-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-contentShow z-50">
            <div className="space-y-5 mt-5">
              <button
                className="flex items-center justify-center w-full gap-3 bg-zinc-200 dark:bg-gray-800 rounded-md py-3 text-gray-700 font-semibold dark:text-white"
                onClick={() => signIn('github')}
              >
                <GitbubIcon aria-hidden />
                Entrar com GitHub
              </button>
              <button
                className="flex items-center justify-center w-full gap-3 bg-zinc-200 dark:bg-gray-800 rounded-md py-3 text-gray-700 font-semibold dark:text-white"
                onClick={() => signIn('twitter')}
              >
                <TwitterIcon aria-hidden />
                Entrar com Twitter
              </button>
            </div>
            <div className="border-t border-zinc-300 dark:border-gray-700 my-7">
              <p className="text-sm font-semibold text-gray-500 mt-5">
                Você poderá deletar sua conta a qualquer momento.
              </p>
            </div>

            <DialogPrimitive.Close asChild>
              <button className="absolute top-3 right-3 rounded-md p-2 text-gray-700 dark:text-white bg-gray-200 bg-opacity-0 hover:bg-opacity-100 dark:bg-gray-700 dark:bg-opacity-0 dark:hover:bg-opacity-100 transition duration-200">
                <CloseIcon />
              </button>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>

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
