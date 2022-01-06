import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { prisma } from 'lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { slug } = req.query

    const _users = prisma.user.findMany({
      where: {
        stacks: {
          some: {
            slug: slug as string
          }
        }
      },
      select: {
        name: true,
        email: true,
        image: true
      }
    })

    const session = await getSession({ req })
    const email = session?.user.email

    const _userAlreadyUse = prisma.user.findFirst({
      where: {
        email: email ?? null,
        stacks: {
          some: {
            slug: slug as string
          }
        }
      }
    })

    const [users, userAlreadyUse] = await prisma.$transaction([_users, _userAlreadyUse])

    return res.status(200).json({
      users,
      userAlreadyUse: Boolean(userAlreadyUse?.id)
    })
  }

  return res.send('Method not allowed.')
}
