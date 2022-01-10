import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { prisma } from 'lib/prisma'
import { questionDetailQuery } from 'shared/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query

    const _question = prisma.question.findUnique({
      where: {
        id: id as string
      },
      select: questionDetailQuery.select
    })

    const session = await getSession({ req })
    const email = session?.user.email

    const _userHasReacted = prisma.reaction.findFirst({
      where: {
        user: {
          email: email ?? null
        },
        question: {
          id: id as string
        }
      }
    })

    const [question, userHasReacted] = await prisma.$transaction([_question, _userHasReacted])

    return res.status(200).json({
      ...question,
      canEdit: question?.author.email === session?.user.email,
      hasReacted: Boolean(userHasReacted?.id)
    })
  }

  if (req.method === 'PATCH') {
    try {
      const session = await getSession({ req })

      if (!session) {
        return res.status(401).send('Unauthorized')
      }

      const { id } = req.query

      const data = JSON.parse(req.body)

      const question = await prisma.question.update({
        where: {
          id: id as string
        },
        data
      })

      return res.status(200).json(question)
    } catch {
      return res.status(500).json({ message: 'Algo deu errado' })
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query

    try {
      const session = await getSession({ req })

      if (!session) {
        return res.status(401).send('Unauthorized')
      }

      const question = await prisma.question.delete({
        where: {
          id: id as string
        }
      })

      return res.status(200).json(question)
    } catch {
      return res.status(500).json({ message: 'Algo deu errado' })
    }
  }

  return res.send('Method not allowed.')
}
