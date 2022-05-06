import { Prisma } from '@prisma/client'
import {
  questionDetailQuery,
  questionsQuery,
  snippetDetailQuery,
  snippetsQuery,
  stackDetailQuery,
  stackQuery,
  commentsQuery
} from 'shared/queries'

export type Scope = 'stack' | 'bookmarks' | 'guestbook' | 'snippets'
export type List = 'list' | 'detail' | 'comments' | 'users'

export type Stack = Prisma.StackGetPayload<typeof stackQuery>
export type Question = Prisma.QuestionGetPayload<typeof questionsQuery>
export type Snippet = Prisma.SnippetGetPayload<typeof snippetsQuery>
export type Comment = Prisma.CommentGetPayload<typeof commentsQuery> & { canEdit: boolean }
export type StackDetail = Prisma.StackGetPayload<typeof stackDetailQuery> & {
  userHasReacted: boolean
}
export type QuestionDetail = Prisma.QuestionGetPayload<typeof questionDetailQuery> & {
  hasReacted: boolean
  canEdit: boolean
}
export type SnippetDetail = Prisma.SnippetGetPayload<typeof snippetDetailQuery> & {
  userHasReacted: boolean
}
