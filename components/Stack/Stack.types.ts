import { Prisma } from '@prisma/client'

export const stackQuery = Prisma.validator<Prisma.StackArgs>()({
  select: {
    name: true,
    slug: true,
    image: true
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

export type Stack = Prisma.StackGetPayload<typeof stackQuery>
export type StackDetail = Prisma.StackGetPayload<typeof stackDetailQuery> & {
  userHasReacted: boolean
}
