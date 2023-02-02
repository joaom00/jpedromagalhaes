import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

import { CloseIcon } from '@/icons'
import { cn } from '@/lib/utils'

const Dialog = (props: React.ComponentProps<typeof DialogPrimitive.Root>) => {
  return <DialogPrimitive.Root {...props} />
}

const DialogTrigger = (props: React.ComponentProps<typeof DialogPrimitive.Trigger>) => {
  return <DialogPrimitive.Trigger {...props} />
}

type DialogContentProps = React.ComponentProps<typeof DialogPrimitive.Content> & {
  title?: string
  description?: string
}

const DialogContent = ({
  title,
  description,
  className,
  children,
  ...props
}: DialogContentProps) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn(
          'fixed inset-0 z-40 animate-overlayShow bg-black/60 backdrop-blur-sm backdrop-filter',
          'data-[state=open]:animate-dialog-overlay-show data-[state=closed]:animate-dialog-overlay-hide'
        )}
      />
      <DialogPrimitive.Content
        {...props}
        className={cn(
          'fixed z-50 max-h-[85vh] w-full max-w-2xl rounded-md bg-gray-1 py-10 px-3 shadow-2xl lg:p-6',
          'data-[state=open]:animate-dialog-content-mobile-show data-[state=closed]:animate-dialog-content-mobile-hide bottom-0 left-0',
          'md:data-[state=open]:animate-dialog-content-show md:data-[state=closed]:animate-dialog-content-hide md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2',
          className
        )}
      >
        <DialogPrimitive.Title className="mb-2 text-lg font-medium text-gray-12">
          {title}
        </DialogPrimitive.Title>
        <DialogPrimitive.Description className="mb-5 text-gray-11">
          {description}
        </DialogPrimitive.Description>
        {children}
        <DialogPrimitive.Close className="absolute top-2.5 right-2.5 rounded-md bg-opacity-0 p-2 text-gray-11 transition duration-200 hover:bg-gray-4 hover:text-gray-12">
          <CloseIcon />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export { Dialog as Root, DialogTrigger as Trigger, DialogContent as Content }
