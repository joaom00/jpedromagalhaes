import { InferGetStaticPropsType } from 'next'
import { allRNProjects } from '.contentlayer/data'

import { ListDetailView } from 'layouts'
import { ProjectList } from 'components/Projects'

export default function ReactNextProjects({ projects }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <ListDetailView list={<ProjectList title="Projetos React & Next" projects={projects} />} />
}

export function getStaticProps() {
  return {
    props: {
      projects: allRNProjects
    }
  }
}

ReactNextProjects.title = 'Projetos React & Next - João Pedro Magalhães'
