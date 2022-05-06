import { GetServerSidePropsContext } from 'next'
import { dehydrate, QueryClient } from 'react-query'

import { fetchComments } from '@/shared/queries'
import { fetchDetail } from '@/lib/useDetailQuery'

import { MainLayout } from '@/layouts'
import { Bookmarks, BookmarksDetail } from '@/components/Bookmarks'

export default function BookmarkDetailPage() {
  return (
    <MainLayout.Root>
      <MainLayout.List hasDetail>
        <Bookmarks />
      </MainLayout.List>
      <MainLayout.Detail>
        <BookmarksDetail />
      </MainLayout.Detail>
    </MainLayout.Root>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext<{ id: string }>) {
  const { id } = ctx.params!

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(
    [{ entity: 'bookmarks', scope: 'detail', identifier: id }],
    fetchDetail
  )
  await queryClient.prefetchQuery(
    [{ entity: 'bookmarks', scope: 'comments', identifier: id }],
    fetchComments
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
