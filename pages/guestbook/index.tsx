import { dehydrate, QueryClient } from 'react-query'

import { fetchList } from 'shared/queries'

import { ListDetailView } from 'layouts'
import { GuestbookList } from 'components/Guestbook'

export default function GuestbookPage() {
  return <ListDetailView list={<GuestbookList />} />
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([{ scope: 'guestbook', type: 'list' }], fetchList)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
