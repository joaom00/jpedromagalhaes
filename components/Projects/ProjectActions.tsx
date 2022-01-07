import { GitbubIcon, WebsiteIcon } from 'icons'

type ProjectActionsProps = {
  githubUrl: string
  livePreviewUrl?: string
}
export default function ProjectActions({ githubUrl, livePreviewUrl }: ProjectActionsProps) {
  return (
    <div className="flex gap-2 md:gap-5">
      <a
        className="bg-gray-250 dark:bg-gray-900 py-2 px-3 rounded-md text-sm flex gap-2 items-center"
        href={githubUrl}
        target="_blank"
        rel="noreferrer noopener"
      >
        <GitbubIcon />
        GitHub
      </a>

      {livePreviewUrl && (
        <a
          className="bg-gray-250 dark:bg-gray-900 py-2 px-3 rounded-md text-sm flex gap-2 items-center"
          target="_blank"
          rel="noreferrer noopener"
          href={livePreviewUrl}
        >
          <WebsiteIcon />
          Website
        </a>
      )}
    </div>
  )
}
