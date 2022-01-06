import { ListDetailView } from 'layouts'
import { HomeTemplate } from 'templates'

export default function Home() {
  return <ListDetailView list={null} hasDetail detail={<HomeTemplate />} />
}

Home.title = 'João Pedro Magalhães - Desenvolvedor Front-End, UI/UX entusiasta & Gopher'
