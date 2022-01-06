import { Prisma } from '@prisma/client'
import { QueryFunctionContext } from 'react-query'
import { QueryKeys } from 'shared/types'

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

export default async function fetchUsers({ queryKey: [{ identifier }] }: QueryFunctionContext<QueryKeys>) {
  const response = await fetch(`/api/stack/users?slug=${identifier}`)
  const data = await response.json()

  return data as Users
}
