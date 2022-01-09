import { ListDetailView } from 'layouts'
import { HomeTemplate } from 'templates'

export default function Home() {
  return <ListDetailView list={null} hasDetail detail={<HomeTemplate />} />
}
