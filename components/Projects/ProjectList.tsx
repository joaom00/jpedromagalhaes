import type { JSProject } from '.contentlayer/types'
import { TitleBar } from 'components'

import ProjectListItem from './ProjectListItem'

export type Project = Omit<JSProject, 'type'>

export default function ProjectList({ title, projects }: { title: string; projects: Project[] }) {
  return (
    <div className="relative flex-none w-full h-full max-h-screen min-h-screen overflow-y-auto border-r border-gray-200 md:w-80 xl:w-96 dark:border-gray-800 dark:bg-gray-900">
      <TitleBar title={title} trailingAccessory={null} />
      <ul className="p-3 space-y-1">
        {projects.map((project) => (
          <ProjectListItem key={project.slug} {...project} />
        ))}
      </ul>
    </div>
  )
}
