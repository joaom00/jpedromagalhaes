import { InferGetStaticPropsType } from 'next'
import { allRNProjects } from '.contentlayer/data'

import { MainLayout } from '@/layouts'
import { ProjectList } from '@/components/Projects'

export default function ReactNextProjects({
  projects
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <MainLayout.Root>
      <MainLayout.List>
        <ProjectList title="Projetos React & Next" projects={projects} />
      </MainLayout.List>
    </MainLayout.Root>
  )
}

export function getStaticProps() {
  return {
    props: {
      projects: allRNProjects
    }
  }
}

ReactNextProjects.title = 'Projetos React & Next - João Pedro Magalhães'
