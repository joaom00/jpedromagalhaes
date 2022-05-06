import Link from 'next/link'
import cn from 'classnames'

type ListProps = React.ComponentPropsWithoutRef<'ul'>

const List = (props: ListProps) => {
  return (
    <ul className="space-y-3 px-3 py-4" {...props}>
      {props.children}
    </ul>
  )
}

type ListItemProps = React.ComponentPropsWithoutRef<'a'> & {
  isActive?: boolean
  href: string
}

const ListItem = ({ isActive = false, href, className = '', ...props }: ListItemProps) => {
  return (
    <li>
      <Link href={href}>
        <a
          className={cn(
            'flex flex-col gap-2 rounded-md px-3 py-2 hover:bg-mauve4 dark:hover:bg-mauveDark4',
            className,
            {
              'bg-mauve5 dark:bg-mauveDark5': isActive,
              'hover:bg-mauve4 dark:hover:bg-mauveDark4': !isActive
            }
          )}
          {...props}
        >
          {props.children}
        </a>
      </Link>
    </li>
  )
}

export { List as Root, ListItem as Item }
