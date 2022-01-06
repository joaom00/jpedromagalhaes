import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { prisma } from 'lib/prisma'
import { commentsQuery } from 'shared/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { identifier } = req.query

    try {
      const _comments = await prisma.comment.findMany({
        where: {
          bookmark: {
            id: identifier as string
          }
        },
        select: commentsQuery.select
      })

      const session = await getSession({ req })

      const comments = _comments.map((comment) => ({
        ...comment,
        canEdit: comment.author.email === session?.user.email
      }))

      return res.status(200).json(comments)
    } catch {
      return res.status(500).json({ message: 'Algo deu errado' })
    }
  }

  if (req.method === 'POST') {
    try {
      const session = await getSession({ req })

      if (!session) {
        return res.status(403).send('Unauthorized')
      }

      const { text, identifier } = JSON.parse(req.body)

      const comment = await prisma.comment.create({
        data: {
          text,
          author: {
            connect: {
              email: session.user.email
            }
          },
          bookmark: {
            connect: {
              id: identifier
            }
          }
        }
      })

      return res.status(200).json(comment)
    } catch {
      return res.status(500).json({ message: 'Algo deu errado' })
    }
  }

  if (req.method === 'PATCH') {
    try {
      const session = await getSession({ req })

      if (!session) {
        return res.status(401).send('Unauthorized')
      }

      const { id, text } = JSON.parse(req.body)

      const comment = await prisma.comment.update({
        where: {
          id
        },
        data: {
          text
        }
      })

      return res.status(200).json(comment)
    } catch {
      return res.status(500).json({ message: 'Algo deu errado' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const session = await getSession({ req })

      if (!session) {
        return res.status(403).send('Unauthorized')
      }

      const { id } = req.query

      const comment = await prisma.comment.delete({
        where: {
          id: id as string
        }
      })

      return res.status(200).json(comment)
    } catch {
      return res.status(500).json({ message: 'Algo deu errado' })
    }
  }

  return res.send('Method not allowed.')
}
