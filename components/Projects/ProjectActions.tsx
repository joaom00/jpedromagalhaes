import { GitbubIcon, WebsiteIcon } from 'icons'

type ProjectActionsProps = {
  githubUrl: string
  livePreviewUrl?: string
}
export default function ProjectActions({ githubUrl, livePreviewUrl }: ProjectActionsProps) {
  return (
    <div className="flex gap-2 md:gap-5">
      <a
        className="flex items-center gap-2 rounded-md bg-gray-250 py-2 px-3 text-sm dark:bg-gray-900"
        href={githubUrl}
        target="_blank"
        rel="noreferrer noopener"
      >
        <GitbubIcon />
        GitHub
      </a>

      {livePreviewUrl && (
        <a
          className="flex items-center gap-2 rounded-md bg-gray-250 py-2 px-3 text-sm dark:bg-gray-900"
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
