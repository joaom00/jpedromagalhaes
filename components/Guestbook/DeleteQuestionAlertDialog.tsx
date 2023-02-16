import React from 'react'
import * as AlertDialog from '@/components/AlertDialog'
import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------------------------------
 * Trigger
 * -----------------------------------------------------------------------------------------------*/
type TriggerElement = React.ComponentRef<typeof AlertDialog.Trigger>
type TriggerProps = React.ComponentPropsWithoutRef<typeof AlertDialog.Trigger>
const DeleteQuestionAlertDialogTrigger = React.forwardRef<TriggerElement, TriggerProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <AlertDialog.Trigger
        {...props}
        ref={forwardedRef}
        className={cn(
          'rounded-md px-3 text-sm text-gray-11 transition duration-100 hover:bg-red-700 hover:text-white',
          className
        )}
      />
    )
  }
)
DeleteQuestionAlertDialogTrigger.displayName = 'DeleteQuestionAlertDialogTrigger'

/* -------------------------------------------------------------------------------------------------
 * Content
 * -----------------------------------------------------------------------------------------------*/
type ContentElement = React.ComponentRef<typeof AlertDialog.Content>
type ContentProps = React.ComponentPropsWithoutRef<typeof AlertDialog.Content>
export const DeleteQuestionAlertDialogContent = React.forwardRef<ContentElement, ContentProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content {...props} ref={forwardedRef}>
          <AlertDialog.Title>Você tem certeza disso?</AlertDialog.Title>
          <AlertDialog.Description>
            Essa ação não poderá ser desfeita. A pergunta será excluída permanentemente.
          </AlertDialog.Description>
          <div className="mt-5 flex justify-end gap-5">{children}</div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    )
  }
)
DeleteQuestionAlertDialogContent.displayName = 'DeleteQuestionAlertDialogContent'

const DeleteQuestionAlertDialogRoot = AlertDialog.Root
const DeleteQuestionAlertDialogAction = AlertDialog.Action
const DeleteQuestionAlertDialogCancel = AlertDialog.Cancel

export {
  DeleteQuestionAlertDialogRoot as Root,
  DeleteQuestionAlertDialogTrigger as Trigger,
  DeleteQuestionAlertDialogContent as Content,
  DeleteQuestionAlertDialogAction as Action,
  DeleteQuestionAlertDialogCancel as Cancel
}
