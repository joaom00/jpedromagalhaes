import { dehydrate, QueryClient } from 'react-query'

import { fetchList } from 'shared/queries'

import { ListDetailView } from 'layouts'
import { BookmarkList } from 'components/Bookmark'

export default function BookmarksPage() {
  return <ListDetailView list={<BookmarkList />} />
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([{ scope: 'bookmarks', type: 'list' }], fetchList)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
