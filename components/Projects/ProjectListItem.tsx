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
          className={`flex items-center space-x-4 rounded-md px-3 py-4 hover:bg-mauve4 dark:hover:bg-mauveDark4 ${
            isActive ? 'bg-mauve5 dark:bg-mauveDark5' : 'hover:bg-mauve4 dark:hover:bg-mauveDark4'
          }`}
        >
          <div>
            <p className="font-medium">{title}</p>
            <p className="text-sm text-slate11 dark:text-slateDark11">{shortDescription}</p>
          </div>
        </a>
      </Link>
    </li>
  )
}
