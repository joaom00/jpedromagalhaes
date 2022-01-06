import Head from 'next/head'
import { useMDXComponent } from 'next-contentlayer/hooks'

import { TitleBar, MDXComponents } from 'components'

import ProjectActions from './ProjectActions'

import type { Project } from './ProjectList'

export default function ProjectDetail({ project }: { project: Project }) {
  const Component = useMDXComponent(project.body.code)

  return (
    <>
      <Head>
        <title>{`Projetos | ${project.title}`}</title>
      </Head>
      <div className="max-h-screen overflow-y-auto w-full">
        <TitleBar
          title={project.title}
          globalMenu={false}
          backButton
          backButtonHref="/projetos/javascript"
          trailingAccessory={<ProjectActions githubUrl={project.githubURL} livePreviewUrl={project.livePreviewURL} />}
        />
        <article className="p-8">
          <div className="prose dark:prose-dark w-full">
            <Component components={MDXComponents} />
          </div>
        </article>
      </div>
    </>
  )
}
