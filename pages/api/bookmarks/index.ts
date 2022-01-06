import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { Prisma } from '@prisma/client'

import { prisma } from 'lib/prisma'
import { bookmarksQuery } from 'shared/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const bookmarks = await prisma.bookmark.findMany({
      select: bookmarksQuery.select,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return res.status(200).json(bookmarks)
  }

  if (req.method === 'POST') {
    const session = await getSession({ req })

    if (!session) {
      return res.status(401).send('Unauthorized')
    }

    if (session.user.role === 'USER') {
      return res.status(401).send('Unauthorized')
    }

    const { data } = JSON.parse(req.body)

    try {
      const bookmark = await prisma.bookmark.create({
        data
      })

      return res.status(201).json(bookmark)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).json({ message: error.message })
      }

      return res.status(500).json({ messge: 'Algo deu errado' })
    }
  }

  return res.status(405).send('Method not allowed.')
}
