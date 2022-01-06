import Link from 'next/link'
import { IconType } from 'react-icons'

import { ExternalLinkIcon } from 'icons'
import { useNavigation } from 'contexts'

type NavigationLinkProps = {
  icon: IconType
  label: string
  href: string
  isActive?: boolean
  isExternal?: boolean
}

export function SidebarLink({ icon: Icon, label, href, isActive = false, isExternal = false }: NavigationLinkProps) {
  const { setOpen } = useNavigation()
  return (
    <li onClick={() => setOpen(false)}>
      <Link href={href}>
        <a
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className={`flex items-center px-2 py-1.5 rounded-md space-x-3 ${
            isActive
              ? 'bg-black text-white hover:bg-black hover:text-white dark:bg-gray-700'
              : 'text-gray-700 dark:text-white hover:bg-gray-200 hover:text-black dark:hover:bg-gray-700'
          }`}
        >
          <Icon />
          <span className="text-sm flex-1">{label}</span>
          {isExternal && <ExternalLinkIcon className="text-gray-500" />}
        </a>
      </Link>
    </li>
  )
}
