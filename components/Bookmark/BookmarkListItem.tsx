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
          className={`flex flex-col gap-1 dark:hover:bg-gray-800 rounded-md px-3 py-2 ${
            isActive ? 'bg-black text-white dark:bg-gray-800' : 'hover:bg-gray-200'
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
            <span className="text-sm text-gray-400">{host}</span>
          </div>
        </a>
      </Link>
    </li>
  )
}
