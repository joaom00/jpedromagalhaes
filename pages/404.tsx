import { ListDetailView } from 'layouts'
import { NotFoundTemplate } from 'templates'

export default function NotFound() {
  return <ListDetailView list={null} hasDetail detail={<NotFoundTemplate />} />
}
