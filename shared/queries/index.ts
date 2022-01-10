import { Prisma } from '@prisma/client'
import { QueryFunctionContext, useInfiniteQuery, useQuery } from 'react-query'
import type { Scope, Comment } from 'shared/types'

// Prisma

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

// React Query

const listKeys = (scope: Scope) => [{ scope, type: 'list' }] as const
const detailKeys = (scope: Scope, identifier: string) => [{ scope, identifier, type: 'detail' }] as const
const usersKeys = (identifier: string) => [{ scope: 'stack', identifier, type: 'users' }] as const
const commentsKeys = (scope: Scope, identifier: string) => [{ scope, identifier, type: 'comments' }] as const

export async function fetchList({
  queryKey: [{ scope }],
  pageParam
}: QueryFunctionContext<ReturnType<typeof listKeys>, string>) {
  const apiUrl = pageParam ? `/api/${scope}?cursor=${pageParam}` : `/api/${scope}`
  const response = await fetch(apiUrl)

  if (!response.ok) {
    throw new Error()
  }

  const data = await response.json()

  return data
}

export function useListQuery<T extends { nextCursor: string }>(scope: Scope) {
  return useInfiniteQuery<T, Error, T, ReturnType<typeof listKeys>>(listKeys(scope), fetchList, {
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })
}

export async function fetchDetail({
  queryKey: [{ scope, identifier }]
}: QueryFunctionContext<ReturnType<typeof detailKeys>>) {
  const response = await fetch(`/api/${scope}/${identifier}`)

  if (!response.ok) {
    throw new Error()
  }

  const data = await response.json()

  return data
}

export function useDetailQuery<T = any>(scope: Scope, identifier: string) {
  return useQuery<T, Error, T, ReturnType<typeof detailKeys>>(detailKeys(scope, identifier), fetchDetail)
}

type PrismaUser = Prisma.UserGetPayload<{
  select: {
    name: true
    email: true
    image: true
  }
}>

type Users = {
  users: PrismaUser[]
  userAlreadyUse: boolean
}

export async function fetchUsers({
  queryKey: [{ identifier }]
}: QueryFunctionContext<ReturnType<typeof usersKeys>>): Promise<Users> {
  const response = await fetch(`/api/stack/users?slug=${identifier}`)
  const data = await response.json()

  return data
}

export function useUsersQuery(identifier: string) {
  return useQuery<Users, Error, Users, ReturnType<typeof usersKeys>>(usersKeys(identifier), fetchUsers)
}

export async function fetchComments({
  queryKey: [{ scope, identifier }]
}: QueryFunctionContext<ReturnType<typeof commentsKeys>>): Promise<Comment[]> {
  const response = await fetch(`/api/${scope}/comments?identifier=${identifier}`)
  const data = await response.json()

  return data
}

export function useCommentsQuery(scope: Scope, identifier: string) {
  return useQuery<Comment[], Error, Comment[], ReturnType<typeof commentsKeys>>(
    commentsKeys(scope, identifier),
    fetchComments
  )
}
