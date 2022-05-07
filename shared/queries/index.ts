import { Prisma } from '@prisma/client'
import { QueryFunctionContext, useQuery } from 'react-query'
import type { Comment } from 'shared/types'

// Prisma

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

// React Query

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

interface FetchUsersContext {
  entity: string
  scope: string
  identifier?: string
}

export async function fetchUsers(
  ctx: QueryFunctionContext<Readonly<FetchUsersContext[]>>
): Promise<Users> {
  const [{ identifier }] = ctx.queryKey
  const response = await fetch(`/api/stack/users?slug=${identifier}`)
  const data = await response.json()

  return data
}

export function useUsersQuery(identifier: string) {
  return useQuery<Users, Error, Users, FetchUsersContext[]>(
    [{ entity: 'stack', scope: 'users', identifier }],
    fetchUsers
  )
}

interface FetchCommentsContext {
  entity: string
  scope: string
  identifier?: string
}

export async function fetchComments(
  ctx: QueryFunctionContext<Readonly<FetchCommentsContext[]>>
): Promise<Comment[]> {
  const [{ entity, identifier }] = ctx.queryKey
  const response = await fetch(`/api/${entity}/comments?identifier=${identifier}`)
  const data = await response.json()

  return data
}

export function useCommentsQuery(entity: string, identifier: string) {
  return useQuery<Comment[], Error, Comment[], FetchCommentsContext[]>(
    [{ entity, scope: 'comments', identifier }],
    fetchComments
  )
}
