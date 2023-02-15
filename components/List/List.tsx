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

const ListItem = ({ isActive = false, href, className, ...props }: ListItemProps) => {
  return (
    <li>
      <Link href={href}>
        <a
          {...props}
          className={cn(
            'flex flex-col gap-2 rounded-md px-3 py-2 hover:bg-gray-4',
            isActive && 'bg-gray-5',
            className
          )}
        />
      </Link>
    </li>
  )
}

export { List as Root, ListItem as Item }
