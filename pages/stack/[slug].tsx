import { GetServerSidePropsContext } from 'next'
import { dehydrate, QueryClient } from 'react-query'

import { fetchComments, fetchUsers } from 'shared/utils'
import { fetchDetail } from 'shared/queries'

import { ListDetailView } from 'layouts'
import { StackList, StackDetail } from 'components/Stack'

export default function StackDetailPage() {
  return <ListDetailView list={<StackList />} hasDetail detail={<StackDetail />} />
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext<{ slug: string }>) => {
  const { slug } = ctx.params!

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([{ scope: 'stack', type: 'detail', identifier: slug }], fetchDetail)
  await queryClient.prefetchQuery([{ scope: 'stack', type: 'users', identifier: slug }], fetchUsers)
  await queryClient.prefetchQuery([{ scope: 'stack', type: 'comments', identifier: slug }], fetchComments)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
