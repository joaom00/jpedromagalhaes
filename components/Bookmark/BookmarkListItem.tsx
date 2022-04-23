import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { Bookmark } from 'shared/types'

export default function BookmarkListItem({ id, title, faviconUrl, host }: Bookmark) {
  const router = useRouter()
  const isActive = router.asPath.indexOf(id) >= 0

  return (
    <li>
      <Link href={`/bookmarks/${id}`}>
        <a
          className={`flex flex-col gap-1 hover:bg-mauve4 dark:hover:bg-mauveDark4 rounded-md px-3 py-2 ${
            isActive ? 'bg-mauve5 dark:bg-mauveDark5' : 'hover:bg-mauve4 dark:hover:bg-mauveDark4'
          }`}
        >
          <p className="font-medium text-sm">{title}</p>
          <div className="flex items-center gap-1">
            <div className="rounded-xl overflow-hidden w-4 h-4 flex flex-none">
              <Image
                src={faviconUrl as string}
                alt={`Favicon do site ${title}`}
                width={24}
                height={24}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm text-slate11 dark:text-slateDark11">{host}</span>
          </div>
        </a>
      </Link>
    </li>
  )
}
