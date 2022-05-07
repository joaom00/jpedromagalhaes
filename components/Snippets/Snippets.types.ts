import { Prisma } from '@prisma/client'

export const snippetsQuery = Prisma.validator<Prisma.SnippetArgs>()({
  select: {
    id: true,
    title: true,
    slug: true,
    logo: true
  }
})

export const snippetDetailQuery = Prisma.validator<Prisma.SnippetArgs>()({
  select: {
    id: true,
    title: true,
    description: true,
    slug: true,
    logo: true,
    _count: {
      select: {
        reactions: true
      }
    }
  }
})

export type Snippet = Prisma.SnippetGetPayload<typeof snippetsQuery>
export type SnippetDetail = Prisma.SnippetGetPayload<typeof snippetDetailQuery> & {
  userHasReacted: boolean
}
