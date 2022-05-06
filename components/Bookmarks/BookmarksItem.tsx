import Image from 'next/image'

import type { Bookmark } from './Bookmarks.queries'

export const BookmarksItem = ({ title, faviconUrl, host }: Bookmark) => {
  return (
    <>
      <p className="text-sm font-medium">{title}</p>
      <div className="flex items-center gap-1">
        <div className="flex h-4 w-4 flex-none overflow-hidden rounded-xl">
          <Image
            src={faviconUrl as string}
            alt={`Favicon do site ${title}`}
            width={24}
            height={24}
            className="h-full w-full object-cover"
          />
        </div>
        <span className="text-sm text-slate11 dark:text-slateDark11">{host}</span>
      </div>
    </>
  )
}
