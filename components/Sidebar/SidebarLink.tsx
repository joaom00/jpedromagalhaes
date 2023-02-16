import Link from 'next/link'
import { IconType } from 'react-icons'
import clsx from 'clsx'

import { useStore } from '@/hooks'

import { ExternalLinkIcon } from '@/icons'

type NavigationLinkProps = {
  icon: IconType
  label: string
  href: string
  isActive?: boolean
  isExternal?: boolean
}

export function SidebarLink({
  icon: Icon,
  label,
  href,
  isActive = false,
  isExternal = false
}: NavigationLinkProps) {
  const closeSidebar = useStore((state) => state.closeSidebar)

  return (
    <li onClick={closeSidebar}>
      <Link href={href}>
        <a
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className={clsx(
            'flex items-center space-x-3 rounded-md px-2 py-1.5 hover:bg-gray-4',
            isActive && 'bg-gray-5'
          )}
        >
          <Icon />
          <span className="flex-1 text-sm">{label}</span>
          {isExternal && <ExternalLinkIcon className="text-gray-11" />}
        </a>
      </Link>
    </li>
  )
}
