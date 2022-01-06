import { dehydrate, QueryClient } from 'react-query'

import { fetchList } from 'shared/utils'

import { ListDetailView } from 'layouts'
import { QuestionList } from 'components/Question'

export default function GuestbookPage() {
  return <ListDetailView list={<QuestionList />} />
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([{ scope: 'questions', type: 'list' }], fetchList)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

GuestbookPage.title = 'Guestbook - João Pedro Magalhães'
