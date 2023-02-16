import React from 'react'
import * as Dialog from '@/components/Dialog'
import { cn } from '@/lib/utils'
import { CloseIcon } from '@/icons'

/* -------------------------------------------------------------------------------------------------
 * Trigger
 * -----------------------------------------------------------------------------------------------*/
type TriggerElement = React.ComponentRef<typeof Dialog.Trigger>
type TriggerProps = React.ComponentPropsWithoutRef<typeof Dialog.Trigger>
const EditBookmarkDialogTrigger = React.forwardRef<TriggerElement, TriggerProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <Dialog.Trigger
        {...props}
        ref={forwardedRef}
        className={cn(
          'rounded-md px-3 text-sm text-gray-11 transition duration-100 hover:bg-gray-4 hover:text-gray-12',
          className
        )}
      />
    )
  }
)
EditBookmarkDialogTrigger.displayName = 'EditBookmarkDialogTrigger'

/* -------------------------------------------------------------------------------------------------
 * Content
 * -----------------------------------------------------------------------------------------------*/
type ContentElement = React.ComponentRef<typeof Dialog.Content>
type ContentProps = React.ComponentPropsWithoutRef<typeof Dialog.Content>
const EditBookmarkDialogContent = React.forwardRef<ContentElement, ContentProps>(
  ({ className, children, ...props }, forwardedRef) => {
    return (
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content {...props} ref={forwardedRef}>
          <Dialog.Title>Editar bookmark</Dialog.Title>
          <Dialog.Description>
            Preencha os campos para fazer alguma alteração no link. Clique em salvar quando terminar
          </Dialog.Description>
          {children}
          <Dialog.Close>
            <CloseIcon />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    )
  }
)
EditBookmarkDialogContent.displayName = 'EditBookmarkDialogContent'

const EditBookmarkDialogRoot = Dialog.Root

export {
  EditBookmarkDialogRoot as Root,
  EditBookmarkDialogTrigger as Trigger,
  EditBookmarkDialogContent as Content
}
