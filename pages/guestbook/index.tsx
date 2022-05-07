import { dehydrate, QueryClient } from 'react-query'

import { fetchList } from '@/lib/useListQuery'

import { MainLayout } from '@/layouts'
import { Guestbook, guestbookKeys } from '@/components/Guestbook'

export default function GuestbookPage() {
  return (
    <MainLayout.Root>
      <MainLayout.List>
        <Guestbook />
      </MainLayout.List>
    </MainLayout.Root>
  )
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(guestbookKeys.list(), fetchList)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
