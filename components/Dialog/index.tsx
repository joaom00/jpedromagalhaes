import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

import { CloseIcon } from 'icons'

type DialogProps = {
  title: string
  description: string
  trigger?: React.ReactNode
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function Dialog({ title, description, trigger = null, open, onOpenChange, children }: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="bg-black bg-opacity-60 fixed inset-0 animate-overlayShow backdrop-filter backdrop-blur-sm z-40" />
        <DialogPrimitive.Content className="bg-white shadow-2xl dark:bg-gray-900 rounded-md max-w-2xl w-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-10 px-3 lg:p-10 animate-contentShow z-50">
          <DialogPrimitive.Title className="text-lg font-medium mb-2 text-gray-700 dark:text-white">
            {title}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="font-light mb-5">{description}</DialogPrimitive.Description>
          {children}
          <DialogPrimitive.Close asChild>
            <button className="absolute top-3 right-3 rounded-md p-2 text-gray-700 dark:text-white bg-gray-200 bg-opacity-0 hover:bg-opacity-100 dark:bg-gray-700 dark:bg-opacity-0 dark:hover:bg-opacity-100 transition duration-200">
              <CloseIcon />
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
