import { Prisma } from '@prisma/client'
import { QueryFunctionContext, useQuery } from 'react-query'
import type { Scope, Comment } from 'shared/types'

// Prisma

export const stackQuery = Prisma.validator<Prisma.StackArgs>()({
  select: {
    name: true,
    slug: true,
    image: true
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

const usersKeys = (identifier: string) => [{ entity: 'stack', identifier, scope: 'users' }] as const
const commentsKeys = (entity: Scope, identifier: string) =>
  [{ entity, identifier, scope: 'comments' }] as const

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
  return useQuery<Users, Error, Users, ReturnType<typeof usersKeys>>(
    usersKeys(identifier),
    fetchUsers
  )
}

export async function fetchComments({
  queryKey: [{ entity, identifier }]
}: QueryFunctionContext<ReturnType<typeof commentsKeys>>): Promise<Comment[]> {
  const response = await fetch(`/api/${entity}/comments?identifier=${identifier}`)
  const data = await response.json()

  return data
}

export function useCommentsQuery(scope: Scope, identifier: string) {
  return useQuery<Comment[], Error, Comment[], ReturnType<typeof commentsKeys>>(
    commentsKeys(scope, identifier),
    fetchComments
  )
}
