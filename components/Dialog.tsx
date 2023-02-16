import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------------------------------
 * DialogOverlay
 * -----------------------------------------------------------------------------------------------*/
type DialogOverlayElement = React.ComponentRef<typeof DialogPrimitive.Overlay>
type DialogOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
const DialogOverlay = React.forwardRef<DialogOverlayElement, DialogOverlayProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <DialogPrimitive.Overlay
        {...props}
        ref={forwardedRef}
        className={cn(
          'fixed inset-0 z-40 animate-overlayShow bg-black/60 backdrop-blur-sm backdrop-filter',
          'data-[state=open]:animate-dialog-overlay-show data-[state=closed]:animate-dialog-overlay-hide',
          className
        )}
      />
    )
  }
)
DialogOverlay.displayName = 'DialogOverlay'

/* -------------------------------------------------------------------------------------------------
 * DialogContent
 * -----------------------------------------------------------------------------------------------*/
type DialogContentElement = React.ComponentRef<typeof DialogPrimitive.Content>
type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
const DialogContent = React.forwardRef<DialogContentElement, DialogContentProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <DialogPrimitive.Content
        {...props}
        ref={forwardedRef}
        className={cn(
          'fixed z-50 max-h-[85vh] w-full max-w-2xl rounded-md bg-gray-1 py-10 px-3 shadow-2xl lg:p-6',
          'bottom-0 left-0 data-[state=open]:animate-dialog-content-mobile-show data-[state=closed]:animate-dialog-content-mobile-hide',
          'md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:data-[state=open]:animate-dialog-content-show md:data-[state=closed]:animate-dialog-content-hide',
          className
        )}
      />
    )
  }
)
DialogContent.displayName = 'DialogContent'

/* -------------------------------------------------------------------------------------------------
 * DialogTitle
 * -----------------------------------------------------------------------------------------------*/
type DialogTitleElement = React.ComponentRef<typeof DialogPrimitive.Title>
type DialogTitleProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
const DialogTitle = React.forwardRef<DialogTitleElement, DialogTitleProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <DialogPrimitive.Title
        {...props}
        ref={forwardedRef}
        className={cn('mb-2 text-lg font-medium text-gray-12', className)}
      />
    )
  }
)
DialogTitle.displayName = 'DialogTitle'

/* -------------------------------------------------------------------------------------------------
 * DialogDescription
 * -----------------------------------------------------------------------------------------------*/
type DialogDescriptionElement = React.ComponentRef<typeof DialogPrimitive.Description>
type DialogDescriptionProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
const DialogDescription = React.forwardRef<DialogDescriptionElement, DialogDescriptionProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <DialogPrimitive.Description
        {...props}
        ref={forwardedRef}
        className={cn('mb-5 text-gray-11', className)}
      />
    )
  }
)
DialogDescription.displayName = 'DialogDescription'

/* -------------------------------------------------------------------------------------------------
 * DialogClose
 * -----------------------------------------------------------------------------------------------*/
type DialogCloseElement = React.ComponentRef<typeof DialogPrimitive.Close>
type DialogCloseProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
const DialogClose = React.forwardRef<DialogCloseElement, DialogCloseProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <DialogPrimitive.Close
        {...props}
        ref={forwardedRef}
        className={cn(
          'absolute top-2.5 right-2.5 rounded-md p-2 text-gray-11 transition duration-200 hover:bg-gray-4 hover:text-gray-12',
          className
        )}
      />
    )
  }
)
DialogClose.displayName = 'DialogClose'

const DialogRoot = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal

export {
  DialogRoot as Root,
  DialogTrigger as Trigger,
  DialogPortal as Portal,
  DialogOverlay as Overlay,
  DialogContent as Content,
  DialogTitle as Title,
  DialogDescription as Description,
  DialogClose as Close
}
