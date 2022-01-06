import { Prisma } from '@prisma/client'
import { QueryFunctionContext, useQuery } from 'react-query'
import type { Scope } from 'shared/types'

export const stackQuery = Prisma.validator<Prisma.StackArgs>()({
  select: {
    name: true,
    slug: true,
    image: true
  }
})

export const bookmarksQuery = Prisma.validator<Prisma.BookmarkArgs>()({
  select: {
    id: true,
    title: true,
    faviconUrl: true,
    host: true
  }
})

export const questionsQuery = Prisma.validator<Prisma.QuestionArgs>()({
  select: {
    id: true,
    title: true,
    author: {
      select: {
        name: true,
        image: true
      }
    }
  }
})

export const snippetsQuery = Prisma.validator<Prisma.SnippetArgs>()({
  select: {
    id: true,
    title: true,
    slug: true,
    logo: true
  }
})

export const commentsQuery = Prisma.validator<Prisma.CommentArgs>()({
  select: {
    id: true,
    text: true,
    createdAt: true,
    author: {
      select: {
        email: true,
        name: true,
        image: true
      }
    }
  }
})

export const stackDetailQuery = Prisma.validator<Prisma.StackArgs>()({
  select: {
    name: true,
    description: true,
    slug: true,
    image: true,
    url: true,
    _count: {
      select: {
        reactions: true
      }
    }
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

export const questionDetailQuery = Prisma.validator<Prisma.QuestionArgs>()({
  select: {
    id: true,
    title: true,
    description: true,
    author: {
      select: {
        email: true,
        name: true,
        image: true
      }
    },
    _count: {
      select: {
        reactions: true
      }
    }
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

const detailKeys = (scope: Scope, identifier: string) => [{ scope, identifier, type: 'detail' }] as const

export async function fetchDetail({
  queryKey: [{ scope, identifier }]
}: QueryFunctionContext<ReturnType<typeof detailKeys>>) {
  const response = await fetch(`/api/${scope}/${identifier}`)
  const data = await response.json()

  return data
}

export function useDetailQuery<T = any>(scope: Scope, identifier: string) {
  return useQuery<T, Error, T, ReturnType<typeof detailKeys>>(detailKeys(scope, identifier), fetchDetail)
}
