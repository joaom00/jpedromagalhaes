import * as TooltipPrimitive from '@radix-ui/react-tooltip'

type TooltipProps = {
  children: React.ReactNode
  content: React.ReactNode
  contentClassName: string
  arrowClassName: string
} & TooltipPrimitive.PopperContentProps

export default function Tooltip({ children, content, contentClassName, arrowClassName, ...props }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={0}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          align="center"
          sideOffset={6}
          className={`px-3 py-1.5 rounded-md flex items-center justify-center animate-overlayShow ${contentClassName}`}
          {...props}
        >
          {content}
          <TooltipPrimitive.Arrow offset={100} width={11} height={5} className={arrowClassName} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
