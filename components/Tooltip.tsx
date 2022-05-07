import * as TooltipPrimitive from '@radix-ui/react-tooltip'

type TooltipProps = {
  children: React.ReactNode
  content: React.ReactNode
  contentClassName: string
  arrowClassName: string
} & TooltipPrimitive.PopperContentProps

export function Tooltip({
  children,
  content,
  contentClassName,
  arrowClassName,
  ...props
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={0}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          align="center"
          sideOffset={6}
          className={`flex animate-overlayShow items-center justify-center rounded-md px-3 py-1.5 ${contentClassName}`}
          {...props}
        >
          {content}
          <TooltipPrimitive.Arrow offset={100} width={11} height={5} className={arrowClassName} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
