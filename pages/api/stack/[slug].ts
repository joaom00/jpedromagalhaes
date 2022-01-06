import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { Prisma } from '@prisma/client'

import { prisma } from 'lib/prisma'
import { stackDetailQuery } from 'shared/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { slug } = req.query

    const _stack = prisma.stack.findUnique({
      where: {
        slug: slug as string
      },
      select: stackDetailQuery.select
    })

    const session = await getSession({ req })
    const email = session?.user.email

    const _userHasReacted = prisma.reaction.findFirst({
      where: {
        user: {
          email: email ?? null
        },
        stack: {
          slug: slug as string
        }
      }
    })

    const [stack, userHasReacted] = await prisma.$transaction([_stack, _userHasReacted])

    return res.status(200).json({
      ...stack,
      userHasReacted: Boolean(userHasReacted?.id)
    })
  }

  if (req.method === 'PATCH') {
    try {
      const session = await getSession({ req })

      if (!session) {
        return res.status(403).send('Unauthorized')
      }

      if (session.user.role === 'USER') {
        return res.status(403).send('Unauthorized')
      }

      const { slug } = req.query
      const data = JSON.parse(req.body)

      const stack = await prisma.stack.update({
        where: {
          slug: slug as string
        },
        data
      })

      return res.status(200).json(stack)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).json({ message: error.message })
      }
      return res.status(500).json({ message: 'Algo deu errado' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const session = await getSession({ req })

      if (!session) {
        return res.status(403).send('Unauthorized')
      }

      if (session.user.role === 'USER') {
        return res.status(403).send('Unauthorized')
      }

      const { slug } = req.query

      const stack = await prisma.stack.delete({
        where: {
          slug: slug as string
        }
      })

      return res.status(200).json(stack)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).json({ message: error.message })
      }
      return res.status(500).json({ message: 'Algo deu errado' })
    }
  }

  return res.send('Method not allowed.')
}
