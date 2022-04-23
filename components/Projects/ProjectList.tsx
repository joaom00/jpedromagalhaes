import type { JSProject } from '.contentlayer/types'

import { TitleBar } from 'components'

import ProjectListItem from './ProjectListItem'

export type Project = Omit<JSProject, 'type'>

export default function ProjectList({ title, projects }: { title: string; projects: Project[] }) {
  return (
    <div className="relative h-full max-h-screen min-h-screen w-full flex-none overflow-y-auto border-r border-mauve6 bg-mauve1 dark:border-mauveDark6 dark:bg-mauveDark1 md:w-80 xl:w-96">
      <TitleBar title={title} trailingAccessory={null} />
      <ul className="space-y-1 p-3">
        {projects.map((project) => (
          <ProjectListItem key={project.slug} {...project} />
        ))}
      </ul>
    </div>
  )
}
