import { GetServerSidePropsContext } from 'next'
import { dehydrate, QueryClient } from 'react-query'

import { fetchUsers, fetchComments } from '@/shared/queries'
import { fetchDetail } from '@/lib/useDetailQuery'

import { MainLayout } from '@/layouts'
import { Stack, StackDetail, stackKeys } from '@/components/Stack'

export default function StackDetailPage() {
  return (
    <MainLayout.Root>
      <MainLayout.List hasDetail>
        <Stack />
      </MainLayout.List>
      <MainLayout.Detail>
        <StackDetail />
      </MainLayout.Detail>
    </MainLayout.Root>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext<{ slug: string }>) {
  const { slug } = ctx.params!

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(stackKeys.detail(slug), fetchDetail)
  await queryClient.prefetchQuery(stackKeys.users(slug), fetchUsers)
  await queryClient.prefetchQuery(stackKeys.comments(slug), fetchComments)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
