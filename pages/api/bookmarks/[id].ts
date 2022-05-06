import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { prisma } from 'lib/prisma'
import { bookmarkDetailQuery } from '@/components/Bookmarks'

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

  return res.send('Method not allowed.')
}
