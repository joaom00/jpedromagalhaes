import { Prisma } from '@prisma/client'

export const guestbookQuery = Prisma.validator<Prisma.QuestionArgs>()({
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

export const guestbookDetailQuery = Prisma.validator<Prisma.QuestionArgs>()({
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

export type Question = Prisma.QuestionGetPayload<typeof guestbookQuery>
export type QuestionDetail = Prisma.QuestionGetPayload<typeof guestbookDetailQuery> & {
  hasReacted: boolean
  canEdit: boolean
}
