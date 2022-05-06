import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { allRNProjects } from '.contentlayer/data'

import { MainLayout } from '@/layouts'
import { ProjectDetail, ProjectList } from '@/components/Projects'

export default function GOProjectDetail({
  projects,
  project
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <MainLayout.Root>
      <MainLayout.List hasDetail>
        <ProjectList title="Projetos React & Next" projects={projects} />
      </MainLayout.List>
      <MainLayout.Detail>
        <ProjectDetail project={project!} />
      </MainLayout.Detail>
    </MainLayout.Root>
  )
}

export function getStaticPaths() {
  return {
    paths: allRNProjects.map((s) => ({ params: { slug: s.slug } })),
    fallback: false
  }
}

export const getStaticProps = (ctx: GetStaticPropsContext<{ slug: string }>) => {
  const { slug } = ctx.params!
  const project = allRNProjects.find((project) => project.slug === slug)

  return {
    props: {
      projects: allRNProjects,
      project
    }
  }
}
