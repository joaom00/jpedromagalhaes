import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

type AlertDialogProps = {
  title: string
  description: string
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger?: React.ReactNode
  children: React.ReactNode
}

export function AlertDialog({
  title,
  description,
  open,
  onOpenChange,
  trigger = null,
  children
}: AlertDialogProps) {
  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialogPrimitive.Trigger asChild>{trigger}</AlertDialogPrimitive.Trigger>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 z-40 animate-overlayShow bg-black bg-opacity-60 backdrop-blur-sm backdrop-filter" />
        <AlertDialogPrimitive.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-y-1/2 -translate-x-1/2 animate-contentShow rounded-md bg-white p-7 shadow-2xl dark:bg-mauveDark1">
          <AlertDialogPrimitive.Title className="mb-2 text-lg font-semibold">
            {title}
          </AlertDialogPrimitive.Title>
          <AlertDialogPrimitive.Description className="text-slate11 dark:text-slateDark11">
            {description}
          </AlertDialogPrimitive.Description>
          {children}
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  )
}
