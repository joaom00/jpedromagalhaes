import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import type { Project } from './ProjectList'

export default function ProjectListItem({ title, shortDescription, tech, slug }: Project) {
  const router = useRouter()
  const isActive = router.asPath.indexOf(slug) >= 0

  return (
    <li>
      <Link href={`/projetos/${tech}/${slug}`}>
        <a
          className={clsx(
            'flex items-center space-x-4 rounded-md px-3 py-4 hover:bg-gray-4',
            isActive && 'bg-gray-5'
          )}
        >
          <div>
            <p className="font-medium text-gray-12">{title}</p>
            <p title={shortDescription} className="text-sm text-gray-11 line-clamp-2">
              {shortDescription}
            </p>
          </div>
        </a>
      </Link>
    </li>
  )
}
