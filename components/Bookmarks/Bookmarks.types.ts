import { Prisma } from '@prisma/client'

export const bookmarksQuery = Prisma.validator<Prisma.BookmarkArgs>()({
  select: {
    id: true,
    title: true,
    faviconUrl: true,
    host: true
  }
})

export const bookmarkDetailQuery = Prisma.validator<Prisma.BookmarkArgs>()({
  select: {
    id: true,
    title: true,
    description: true,
    faviconUrl: true,
    host: true,
    url: true,
    _count: {
      select: {
        reactions: true
      }
    }
  }
})

export type Bookmark = Prisma.BookmarkGetPayload<typeof bookmarksQuery>
export type BookmarkDetail = Prisma.BookmarkGetPayload<typeof bookmarkDetailQuery> & {
  userHasReacted: boolean
}
