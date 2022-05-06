import { Snippet } from '@/shared/types'

import { Image } from '@/components'

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
