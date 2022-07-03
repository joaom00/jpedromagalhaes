import type { Project } from './ProjectList'

export default function ProjectListItem({ title, shortDescription }: Project) {
  return (
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-slate11 dark:text-slateDark11">{shortDescription}</p>
    </div>
  )
}
