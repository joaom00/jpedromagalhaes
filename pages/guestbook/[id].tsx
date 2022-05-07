import { GetServerSidePropsContext } from 'next'
import { dehydrate, QueryClient } from 'react-query'

import { fetchComments } from '@/shared/queries'
import { fetchDetail } from '@/lib/useDetailQuery'

import { MainLayout } from '@/layouts'
import { Guestbook, GuestbookDetail, guestbookKeys } from '@/components/Guestbook'

export default function GuestbookDetailPage() {
  return (
    <MainLayout.Root>
      <MainLayout.List hasDetail>
        <Guestbook />
      </MainLayout.List>
      <MainLayout.Detail>
        <GuestbookDetail />
      </MainLayout.Detail>
    </MainLayout.Root>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext<{ id: string }>) {
  const { id } = ctx.params!

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(guestbookKeys.detail(id), fetchDetail)
  await queryClient.prefetchQuery(
    [{ entity: 'guestbook', scope: 'comments', identifier: id }],
    fetchComments
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
