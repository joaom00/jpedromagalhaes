import Image from 'next/image'

import type { Question } from './Guestbook.types'

export function GuestbookItem({ title, author }: Question) {
  return (
    <>
      <p className="text-sm font-medium">{title}</p>
      <div className="flex items-center gap-2">
        <div className="flex h-4 w-4 flex-none overflow-hidden rounded-full">
          <Image
            src={author.image as string}
            alt={`Favicon do site ${author.name}`}
            width={24}
            height={24}
            className="h-full w-full object-cover"
          />
        </div>
        <span className="text-sm text-slate11 dark:text-slateDark11">{author.name}</span>
      </div>
    </>
  )
}
