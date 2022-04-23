import Link from 'next/link'
import { useRouter } from 'next/router'

import { Snippet } from 'shared/types'

import { Image } from 'components'

export default function SnippetItem({ title, slug, logo }: Snippet) {
  const router = useRouter()
  const isActive = router.asPath.indexOf(slug) >= 0

  return (
    <li>
      <Link href={`/snippets/${slug}`}>
        <a
          className={`flex items-center space-x-4 hover:bg-mauve4 dark:hover:bg-mauveDark4 rounded-md px-3 py-2 ${
            isActive ? 'bg-mauve5 dark:bg-mauveDark5' : 'hover:bg-mauve4 dark:hover:bg-mauveDark4'
          }`}
        >
          <div className="rounded-xl overflow-hidden w-12 h-12">
            <Image src={`/logos/${logo}`} alt={title} width={48} height={48} />
          </div>
          <p className="font-medium text-sm">{title}</p>
        </a>
      </Link>
    </li>
  )
}
