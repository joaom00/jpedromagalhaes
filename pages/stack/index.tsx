import { dehydrate, QueryClient } from 'react-query'

import { fetchList } from '@/lib/useListQuery'

import { MainLayout } from '@/layouts'
import { Stack, stackKeys } from '@/components/Stack'

export default function StackPage() {
  return (
    <MainLayout.Root>
      <MainLayout.List>
        <Stack />
      </MainLayout.List>
    </MainLayout.Root>
  )
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery(stackKeys.list(), fetchList)

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient)))
    }
  }
}
