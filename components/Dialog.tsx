import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

import { CloseIcon } from '@/icons'

type DialogProps = {
  title: string
  description: string
  trigger?: React.ReactNode
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Dialog({
  title,
  description,
  trigger = null,
  open,
  onOpenChange,
  children
}: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-40 animate-overlayShow bg-black bg-opacity-60 backdrop-blur-sm backdrop-filter" />
        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 transform animate-contentShow rounded-md bg-white py-10 px-3 shadow-2xl dark:bg-mauveDark1 lg:p-10">
          <DialogPrimitive.Title className="mb-2 text-lg font-medium text-slate12 dark:text-slateDark12">
            {title}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="mb-5 text-slate11 dark:text-slateDark11">
            {description}
          </DialogPrimitive.Description>
          {children}
          <DialogPrimitive.Close asChild>
            <button className="absolute top-3 right-3 rounded-md bg-gray-200 bg-opacity-0 p-2 text-gray-700 transition duration-200 hover:bg-opacity-100 dark:bg-gray-700 dark:bg-opacity-0 dark:text-white dark:hover:bg-opacity-100">
              <CloseIcon />
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
