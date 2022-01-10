import { GetServerSidePropsContext } from 'next'
import { dehydrate, QueryClient } from 'react-query'

import { fetchDetail, fetchComments } from 'shared/queries'

import { ListDetailView } from 'layouts'
import { GuestbookList, GuestbookDetail } from 'components/Guestbook'

export default function QuestionDetailPage() {
  return <ListDetailView list={<GuestbookList />} hasDetail detail={<GuestbookDetail />} />
}

export async function getServerSideProps(ctx: GetServerSidePropsContext<{ id: string }>) {
  const { id } = ctx.params!

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([{ scope: 'guestbook', type: 'detail', identifier: id }], fetchDetail)
  await queryClient.prefetchQuery([{ scope: 'guestbook', type: 'comments', identifier: id }], fetchComments)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
