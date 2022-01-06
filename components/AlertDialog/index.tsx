import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

type AlertDialogProps = {
  title: string
  description: string
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger?: React.ReactNode
  children: React.ReactNode
}

export default function AlertDialog({
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
        <AlertDialogPrimitive.Overlay className="inset-0 fixed bg-black bg-opacity-60 animate-overlayShow z-40 backdrop-filter backdrop-blur-sm" />
        <AlertDialogPrimitive.Content className="max-w-lg shadow-2xl rounded-md fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full bg-white dark:bg-gray-900 p-7 animate-contentShow z-50">
          <AlertDialogPrimitive.Title className="text-lg font-semibold mb-2">{title}</AlertDialogPrimitive.Title>
          <AlertDialogPrimitive.Description className="text-gray-500">{description}</AlertDialogPrimitive.Description>
          {children}
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  )
}
