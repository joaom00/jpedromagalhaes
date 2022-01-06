import { dehydrate, QueryClient } from 'react-query'

import { fetchList } from 'shared/utils'

import { ListDetailView } from 'layouts'
import { StackList } from 'components/Stack'

export default function StackPage() {
  return <ListDetailView list={<StackList />} />
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery([{ scope: 'stack', type: 'list' }], fetchList)

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient)))
    }
  }
}

StackPage.title = 'Stack - João Pedro Magalhães'
