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
          className={`flex items-center px-2 py-1.5 rounded-md space-x-3  ${
            isActive
              ? 'bg-mauve5 dark:bg-mauveDark5'
              : 'text-slate12 dark:text-slateDark12 hover:bg-mauve4 dark:hover:bg-mauveDark4'
          }`}
        >
          <Icon />
          <span className="text-sm flex-1">{label}</span>
          {isExternal && <ExternalLinkIcon className="text-slate11 dark:text-slateDark11" />}
        </a>
      </Link>
    </li>
  )
}
