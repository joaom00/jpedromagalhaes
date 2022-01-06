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
          className={`flex items-center space-x-4 dark:hover:bg-gray-800 rounded-md px-3 py-4 ${
            isActive ? 'bg-black text-white dark:bg-gray-800' : 'hover:bg-gray-200'
          }`}
        >
          <div>
            <p className="font-medium">{title}</p>
            <p className="text-sm text-gray-400">{shortDescription}</p>
          </div>
        </a>
      </Link>
    </li>
  )
}
