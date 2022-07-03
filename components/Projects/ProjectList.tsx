import type { JSProject } from '.contentlayer/types'

import { TitleBar, List, ListItem } from 'components'
import { useRouter } from 'next/router'

import ProjectListItem from './ProjectListItem'

export type Project = Omit<JSProject, 'type'>

export default function ProjectList({ title, projects }: { title: string; projects: Project[] }) {
  const router = useRouter()
  return (
    <div className="relative h-full max-h-screen min-h-screen w-full flex-none overflow-y-auto border-r border-mauve6 bg-mauve1 dark:border-mauveDark6 dark:bg-mauveDark1 md:w-80 xl:w-96">
      <TitleBar title={title} trailingAccessory={null} />

      <List className="space-y-1 p-3">
        {projects.map((project) => (
          <ListItem
            key={project.slug}
            href={`/projetos/${project.tech}/${project.slug}`}
            isActive={router.asPath.indexOf(project.slug) >= 0}
            className="py-4"
          >
            <ProjectListItem {...project} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}
