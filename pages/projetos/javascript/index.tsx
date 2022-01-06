import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { allJSProjects } from '.contentlayer/data'
import { useRegisterActions } from 'kbar'

import { ListDetailView } from 'layouts'
import { ProjectList } from 'components/Projects'

export default function JavaScriptProjects({ projects }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  useRegisterActions(
    projects.map((project) => ({
      id: project._id,
      name: project.title,
      keywords: project.title,
      section: 'Geral',
      perform: () => router.push(`javascript/${project.slug}`)
    }))
  )
  return <ListDetailView list={<ProjectList title="Projetos JavaScript" projects={projects} />} />
}

export async function getStaticProps() {
  return {
    props: {
      projects: allJSProjects
    }
  }
}

JavaScriptProjects.title = 'Projetos JavaScript - João Pedro Magalhães'
