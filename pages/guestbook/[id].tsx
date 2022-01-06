import { GetServerSidePropsContext } from 'next'
import { dehydrate, QueryClient } from 'react-query'

import { fetchComments } from 'shared/utils'
import { fetchDetail } from 'shared/queries'

import { ListDetailView } from 'layouts'
import { QuestionList, QuestionDetail } from 'components/Question'

export default function QuestionDetailPage() {
  return <ListDetailView list={<QuestionList />} hasDetail detail={<QuestionDetail />} />
}

export async function getServerSideProps(ctx: GetServerSidePropsContext<{ id: string }>) {
  const { id } = ctx.params!

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([{ scope: 'questions', type: 'detail', identifier: id }], fetchDetail)
  await queryClient.prefetchQuery([{ scope: 'questions', type: 'comments', identifier: id }], fetchComments)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
