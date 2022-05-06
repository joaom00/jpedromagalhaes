import { dehydrate, QueryClient } from 'react-query'

import { fetchList } from '@/lib/useListQuery'

import { MainLayout } from '@/layouts'
import { Snippets } from '@/components/Snippets'

export default function SnippetsPage() {
  return (
    <MainLayout.Root>
      <MainLayout.List>
        <Snippets />
      </MainLayout.List>
    </MainLayout.Root>
  )
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([{ entity: 'snippets', scope: 'list' }], fetchList)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
