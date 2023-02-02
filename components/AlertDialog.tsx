import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { cn } from '@/lib/utils'

const AlertDialog = (props: React.ComponentProps<typeof AlertDialogPrimitive.Root>) => {
  return <AlertDialogPrimitive.Root {...props} />
}

const AlertDialogTrigger = (props: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) => {
  return <AlertDialogPrimitive.Trigger {...props} />
}

type AlertDialogContentProps = React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
  title?: string
  description?: string
}

const AlertDialogContent = ({
  title,
  description,
  className,
  children,
  ...props
}: AlertDialogContentProps) => {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className="fixed inset-0 z-40 animate-overlayShow bg-black/60 backdrop-blur-sm backdrop-filter" />
      <AlertDialogPrimitive.Content
        {...props}
        className={cn(
          'fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-y-1/2 -translate-x-1/2 animate-contentShow rounded-md bg-gray-1 p-7 shadow-2xl',
          className
        )}
      >
        <AlertDialogPrimitive.Title className="mb-2 text-lg font-semibold text-gray-12">
          {title}
        </AlertDialogPrimitive.Title>
        <AlertDialogPrimitive.Description className="text-gray-11">
          {description}
        </AlertDialogPrimitive.Description>
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  )
}

const AlertDialogAction = AlertDialogPrimitive.Action
const AlertDialogCancel = AlertDialogPrimitive.Cancel

export {
  AlertDialog as Root,
  AlertDialogTrigger as Trigger,
  AlertDialogContent as Content,
  AlertDialogAction as Action,
  AlertDialogCancel as Cancel
}
