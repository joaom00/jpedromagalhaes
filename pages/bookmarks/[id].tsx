import { GetServerSidePropsContext } from 'next'
import { dehydrate, QueryClient } from 'react-query'

import { fetchComments } from 'shared/utils'
import { fetchDetail } from 'shared/queries'

import { ListDetailView } from 'layouts'
import { BookmarkList, BookmarkDetail } from 'components/Bookmark'

export default function BookmarkDetailPage() {
  return <ListDetailView list={<BookmarkList />} hasDetail detail={<BookmarkDetail />} />
}

export async function getServerSideProps(ctx: GetServerSidePropsContext<{ id: string }>) {
  const { id } = ctx.params!

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([{ scope: 'bookmarks', type: 'detail', identifier: id }], fetchDetail)
  await queryClient.prefetchQuery([{ scope: 'bookmarks', type: 'comments', identifier: id }], fetchComments)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
