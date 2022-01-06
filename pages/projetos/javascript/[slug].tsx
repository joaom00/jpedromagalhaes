import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { allJSProjects } from '.contentlayer/data'
import { useRegisterActions } from 'kbar'

import { ListDetailView } from 'layouts'

import { ProjectDetail, ProjectList } from 'components/Projects'

export default function JSProjectDetail({ projects, project }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  useRegisterActions(
    projects.map((project) => ({
      id: project.slug,
      name: project.title,
      keywords: project.title,
      section: 'Geral',
      perform: () => router.push(`${project.slug}`)
    }))
  )

  return (
    <ListDetailView
      list={<ProjectList title="Projetos JavaScript" projects={projects} />}
      hasDetail
      detail={<ProjectDetail project={project!} />}
    />
  )
}

export function getStaticPaths() {
  return {
    paths: allJSProjects.map((s) => ({ params: { slug: s.slug } })),
    fallback: false
  }
}

export function getStaticProps(ctx: GetStaticPropsContext<{ slug: string }>) {
  const { slug } = ctx.params!
  const project = allJSProjects.find((project) => project.slug === slug)

  return {
    props: {
      projects: allJSProjects,
      project
    }
  }
}
