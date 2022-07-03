import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import { createContext } from '@/lib/createContext'

interface ListContextValue {
  repositionHighlight: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

const [ListProvider, useListContext] = createContext<ListContextValue>('List')

type ListProps = React.ComponentPropsWithoutRef<'ul'>

const List = ({ className, children, ...props }: ListProps) => {
  const [tabBoundingBox, setTabBoundingBox] = React.useState<DOMRect>()
  const [wrapperBoundingBox, setWrapperBoundingBox] = React.useState<DOMRect>()
  const [isTabHighlighted, setIsTabHighlighted] = React.useState(false)
  const [isHoveredFromNull, setIsHoveredFromNull] = React.useState(true)

  const wrapperRef = React.useRef<HTMLUListElement>(null)

  const repositionHighlight = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setTabBoundingBox(event.currentTarget.getBoundingClientRect())
    setWrapperBoundingBox(wrapperRef.current?.getBoundingClientRect())
    setIsHoveredFromNull(!isTabHighlighted)
    setIsTabHighlighted(true)
  }

  const resetHighlight = () => setIsTabHighlighted(false)

  const highlightStyles: React.CSSProperties = {}

  if (tabBoundingBox && wrapperBoundingBox) {
    highlightStyles.transitionDuration = isHoveredFromNull ? '0ms' : '150ms'
    highlightStyles.opacity = isTabHighlighted ? 1 : 0
    highlightStyles.width = `${tabBoundingBox.width}px`
    highlightStyles.height = `${tabBoundingBox.height}px`
    highlightStyles.transform = `translateY(${tabBoundingBox.top - wrapperBoundingBox.top}px)`
  }

  return (
    <ListProvider repositionHighlight={repositionHighlight}>
      <ul
        className={cn('relative space-y-3 px-3 py-4', className)}
        onMouseLeave={resetHighlight}
        ref={wrapperRef}
        {...props}
      >
        <ListHighlight style={highlightStyles} />
        {children}
      </ul>
    </ListProvider>
  )
}

type ListItemProps = React.ComponentPropsWithoutRef<'a'> & {
  isActive?: boolean
  href: string
}

const ListItem = ({ isActive = false, href, className = '', ...props }: ListItemProps) => {
  const context = useListContext('ListItem')

  return (
    <li className="relative">
      <Link href={href}>
        <a
          className={cn('relative flex flex-col gap-2 rounded-md px-3 py-2', className, {
            'bg-mauve5 dark:bg-mauveDark5': isActive
          })}
          onMouseOver={context.repositionHighlight}
          {...props}
        >
          {props.children}
        </a>
      </Link>
    </li>
  )
}

type ListHighlightProps = React.ComponentPropsWithRef<'div'>
const ListHighlight = (props: ListHighlightProps) => (
  <div
    className="bg-mauve4 dark:bg-mauveDark4 absolute top-0 left-3 rounded-md transition-all ease-in-out duration-150"
    {...props}
  />
)

ListHighlight.displayName = 'ListHighlight'

export { List, ListItem }
