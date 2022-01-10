import { dehydrate, QueryClient } from 'react-query'

import { fetchList } from 'shared/queries'

import { ListDetailView } from 'layouts'
import { SnippetList } from 'components/Snippet'

export default function SnippetsPage() {
  return <ListDetailView list={<SnippetList />} />
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([{ scope: 'snippets', type: 'list' }], fetchList)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
