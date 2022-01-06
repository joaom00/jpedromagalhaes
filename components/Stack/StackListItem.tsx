import Link from 'next/link'
import { useRouter } from 'next/router'

import { Stack } from 'shared/types'

import { Image } from 'components'

export default function StackListItem({ name, slug, image }: Stack) {
  const router = useRouter()
  const isActive = router.asPath.indexOf(slug) >= 0

  return (
    <li>
      <Link href={`/stack/${slug}`}>
        <a
          className={`flex items-center space-x-4 dark:hover:bg-gray-800 rounded-md px-3 py-2 ${
            isActive ? 'bg-black text-white dark:bg-gray-800' : 'hover:bg-gray-200'
          }`}
        >
          <div className="rounded-xl overflow-hidden w-12 h-12">
            <Image src={image} alt={`Logo do ${name}`} width={48} height={48} quality={90} />
          </div>
          <p className="font-medium text-sm">{name}</p>
        </a>
      </Link>
    </li>
  )
}
