import { ListDetailView } from 'layouts'
import { NotFoundTemplate } from 'templates'

export default function NotFound() {
  return <ListDetailView list={null} hasDetail detail={<NotFoundTemplate />} />
}

NotFound.title = 'João Pedro Magalhães - Desenvolvedor Front-End, UI/UX entusiasta & Gopher'
