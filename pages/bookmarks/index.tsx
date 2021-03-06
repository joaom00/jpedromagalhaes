import { dehydrate, QueryClient } from 'react-query'

import { fetchList } from '@/lib/useListQuery'

import { MainLayout } from '@/layouts'
import { bookmarkKeys, Bookmarks } from '@/components/Bookmarks'

export default function BookmarksPage() {
  return (
    <MainLayout.Root>
      <MainLayout.List>
        <Bookmarks />
      </MainLayout.List>
    </MainLayout.Root>
  )
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(bookmarkKeys.list(), fetchList)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
