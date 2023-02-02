import { cn } from '@/lib/utils'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

type TooltipProps = {
  children: React.ReactNode
  content: React.ReactNode
  delayDuration?: number
} & TooltipPrimitive.PopperContentProps

export const Tooltip = ({
  children,
  content,
  className,
  delayDuration,
  ...props
}: TooltipProps) => {
  return (
    <TooltipPrimitive.Root delayDuration={delayDuration}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        align="center"
        sideOffset={6}
        className={cn(
          'flex animate-overlayShow items-center justify-center rounded-md px-3 py-1.5',
          className
        )}
        {...props}
      >
        {content}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  )
}
