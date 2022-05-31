import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { prisma } from '@/lib/prisma'
import { bookmarkDetailQuery } from '@/components/Bookmarks'
import { Prisma } from '@prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query

    const _bookmark = prisma.bookmark.findUnique({
      where: {
        id: id as string
      },
      select: bookmarkDetailQuery.select
    })

    const session = await getSession({ req })
    const email = session?.user.email

    const _userHasReacted = prisma.reaction.findFirst({
      where: {
        user: {
          email: email ?? null
        },
        bookmark: {
          id: id as string
        }
      }
    })

    const [bookmark, userHasReacted] = await prisma.$transaction([_bookmark, _userHasReacted])

    return res.status(200).json({
      ...bookmark,
      userHasReacted: Boolean(userHasReacted?.id)
    })
  }

  if (req.method === 'DELETE') {
    const session = await getSession({ req })
    console.log('-----------------------------session------------------', session)

    if (!session) {
      return res.status(401).send('Unauthorized')
    }

    if (session?.user.role === 'USER') {
      return res.status(401).send('Unauthorized')
    }

    const { id } = req.query

    try {
      const deletedBookmark = await prisma.bookmark.delete({
        where: { id: id as string }
      })

      return res.status(200).json(deletedBookmark)
    } catch (error) {
      console.error(error)

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).json({ message: error.message })
      }

      return res.status(500).json({ messge: 'Algo deu errado' })
    }
  }

  return res.send('Method not allowed.')
}
