import { Image } from '@/components'

import type { Snippet } from './Snippets.types'

export function SnippetsItem({ title, logo }: Snippet) {
  return (
    <>
      <div className="h-12 w-12 overflow-hidden rounded-xl">
        <Image src={`/logos/${logo}`} alt={title} width={48} height={48} />
      </div>
      <p className="text-sm font-medium">{title}</p>
    </>
  )
}
