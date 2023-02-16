import React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------------------------------
 * AlertDialogOverlay
 * -----------------------------------------------------------------------------------------------*/
type AlertDialogOverlayElement = React.ComponentRef<typeof AlertDialogPrimitive.Overlay>
type AlertDialogOverlayProps = React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
const AlertDialogOverlay = React.forwardRef<AlertDialogOverlayElement, AlertDialogOverlayProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <AlertDialogPrimitive.Overlay
        {...props}
        ref={forwardedRef}
        className={cn(
          'fixed inset-0 z-40 animate-overlayShow bg-black/30 backdrop-blur-sm backdrop-filter',
          'data-[state=open]:animate-dialog-overlay-show data-[state=closed]:animate-dialog-overlay-hide',
          className
        )}
      />
    )
  }
)
AlertDialogOverlay.displayName = 'AlertDialogOverlay'

/* -------------------------------------------------------------------------------------------------
 * AlertDialogContent
 * -----------------------------------------------------------------------------------------------*/
type AlertDialogContentElement = React.ComponentRef<typeof AlertDialogPrimitive.Content>
type AlertDialogContentProps = React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
const AlertDialogContent = React.forwardRef<AlertDialogContentElement, AlertDialogContentProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <AlertDialogPrimitive.Content
        {...props}
        ref={forwardedRef}
        className={cn(
          'fixed z-50 w-full rounded-md bg-gray-1 p-7 shadow-2xl',
          'bottom-0 left-0 data-[state=open]:animate-dialog-content-mobile-show data-[state=closed]:animate-dialog-content-mobile-hide',
          'md:bottom-auto md:top-1/2 md:left-1/2 md:max-w-lg md:-translate-y-1/2 md:-translate-x-1/2 md:data-[state=open]:animate-dialog-content-show md:data-[state=closed]:animate-dialog-content-hide',
          className
        )}
      ></AlertDialogPrimitive.Content>
    )
  }
)
AlertDialogContent.displayName = 'AlertDialogContent'

/* -------------------------------------------------------------------------------------------------
 * AlertDialogTitle
 * -----------------------------------------------------------------------------------------------*/
type AlertDialogTitleElement = React.ComponentRef<typeof AlertDialogPrimitive.Title>
type AlertDialogTitleProps = React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
const AlertDialogTitle = React.forwardRef<AlertDialogTitleElement, AlertDialogTitleProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <AlertDialogPrimitive.Title
        {...props}
        ref={forwardedRef}
        className={cn('mb-2 text-lg font-semibold text-gray-12', className)}
      />
    )
  }
)
AlertDialogTitle.displayName = 'AlertDialogTitle'

/* -------------------------------------------------------------------------------------------------
 * AlertDialogDescription
 * -----------------------------------------------------------------------------------------------*/
type AlertDialogDescriptionElement = React.ComponentRef<typeof AlertDialogPrimitive.Description>
type AlertDialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Description
>
const AlertDialogDescription = React.forwardRef<
  AlertDialogDescriptionElement,
  AlertDialogDescriptionProps
>(({ className, ...props }, forwardedRef) => {
  return (
    <AlertDialogPrimitive.Description
      {...props}
      ref={forwardedRef}
      className={cn('text-gray-11', className)}
    />
  )
})
AlertDialogDescription.displayName = 'AlertDialogDescription'

/* -------------------------------------------------------------------------------------------------
 * AlertDialogAction
 * -----------------------------------------------------------------------------------------------*/
type AlertDialogActionElement = React.ComponentRef<typeof AlertDialogPrimitive.Action>
type AlertDialogActionProps = React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
const AlertDialogAction = React.forwardRef<AlertDialogActionElement, AlertDialogActionProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <AlertDialogPrimitive.Action
        {...props}
        ref={forwardedRef}
        className={cn(
          'inline-flex items-center justify-center gap-3 rounded-md bg-red-700 py-2 px-3 leading-none text-white hover:bg-red-600',
          className
        )}
      />
    )
  }
)
AlertDialogAction.displayName = 'AlertDialogAction'

/* -------------------------------------------------------------------------------------------------
 * AlertDialogCancel
 * -----------------------------------------------------------------------------------------------*/
type AlertDialogCancelElement = React.ComponentRef<typeof AlertDialogPrimitive.Cancel>
type AlertDialogCancelProps = React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
const AlertDialogCancel = React.forwardRef<AlertDialogCancelElement, AlertDialogCancelProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <AlertDialogPrimitive.Cancel
        {...props}
        ref={forwardedRef}
        className={cn(
          'inline-flex items-center justify-center gap-3 rounded-md bg-gray-3 py-2 px-3 text-gray-12 hover:bg-gray-4',
          className
        )}
      />
    )
  }
)
AlertDialogCancel.displayName = 'AlertDialogCancel'

const AlertDialog = AlertDialogPrimitive.Root
const AlertDialogTrigger = AlertDialogPrimitive.Trigger
const AlertDialogPortal = AlertDialogPrimitive.Portal

export {
  AlertDialog as Root,
  AlertDialogTrigger as Trigger,
  AlertDialogPortal as Portal,
  AlertDialogOverlay as Overlay,
  AlertDialogContent as Content,
  AlertDialogTitle as Title,
  AlertDialogDescription as Description,
  AlertDialogAction as Action,
  AlertDialogCancel as Cancel
}
