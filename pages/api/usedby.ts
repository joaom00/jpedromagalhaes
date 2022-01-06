import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const session = await getSession({ req })

      if (!session) {
        return res.status(403).send('Unauthorized')
      }

      const { slug } = JSON.parse(req.body)

      const email = session.user.email

      const userAlreadyUse = await prisma.user.findFirst({
        where: {
          email,
          stacks: {
            some: {
              slug
            }
          }
        }
      })

      if (!userAlreadyUse) {
        await prisma.stack.update({
          where: {
            slug
          },
          data: {
            users: {
              connect: [{ email }]
            }
          }
        })

        return res.status(200).send('connected')
      }

      await prisma.stack.update({
        where: {
          slug
        },
        data: {
          users: {
            disconnect: [{ id: userAlreadyUse.id }]
          }
        }
      })

      return res.status(200).send('disconnected')
    } catch {
      return res.status(500).json({ message: 'Algo deu errado' })
    }
  }

  return res.send('Method not allowed.')
}
