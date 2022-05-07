import { Prisma } from '@prisma/client'
import { commentsQuery } from '@/shared/queries'

export type Scope = 'stack' | 'bookmarks' | 'guestbook' | 'snippets'
export type List = 'list' | 'detail' | 'comments' | 'users'

export type Comment = Prisma.CommentGetPayload<typeof commentsQuery> & { canEdit: boolean }
