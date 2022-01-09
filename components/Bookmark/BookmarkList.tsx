import dynamic from 'next/dynamic'
import { useQuery } from 'react-query'

import type { QueryKeys, Bookmark } from 'shared/types'
import { fetchList } from 'shared/utils'

import { SpinnerIcon } from 'icons'
import { Container, TitleBar } from 'components'

import BookmarkItem from './BookmarkListItem'

const AddBookmarkDialog = dynamic(() => import('./AddBookmarkDialog'))

export default function BookmarkList() {
  const bookmarksQuery = useQuery<Bookmark[], unknown, Bookmark[], QueryKeys>(
    [{ scope: 'bookmarks', type: 'list' }],
    fetchList,
    { staleTime: Infinity }
  )

  return (
    <Container
      title="Bookmarks - João Pedro Magalhães"
      customClassname="h-full border-r border-gray-200 md:w-80 xl:w-96 dark:border-gray-800 dark:bg-gray-900"
    >
      <TitleBar title="Bookmarks" trailingAccessory={<AddBookmarkDialog />} />

      {bookmarksQuery.isLoading && (
        <div className="flex justify-center">
          <SpinnerIcon />
        </div>
      )}

      {bookmarksQuery.isSuccess && (
        <ul className="p-3 space-y-1">
          {bookmarksQuery.data?.map(({ id, title, faviconUrl, host }) => (
            <BookmarkItem key={id} id={id} title={title} faviconUrl={faviconUrl} host={host} />
          ))}
        </ul>
      )}
    </Container>
  )
}
