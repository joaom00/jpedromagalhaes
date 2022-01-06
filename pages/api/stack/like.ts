import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { prisma } from 'lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const session = await getSession({ req })

      if (!session) {
        return res.status(403).send('Unauthorized')
      }

      const { identifier } = JSON.parse(req.body)

      const email = session.user.email

      const userHasReacted = await prisma.reaction.findFirst({
        where: {
          user: {
            email
          },
          stack: {
            slug: identifier
          }
        }
      })

      if (!userHasReacted) {
        await prisma.reaction.create({
          data: {
            user: {
              connect: { email }
            },
            stack: {
              connect: { slug: identifier }
            }
          }
        })

        return res.status(200).send('connected')
      }

      await prisma.reaction.delete({
        where: {
          id: userHasReacted?.id
        }
      })

      return res.status(200).send('disconnected')
    } catch {
      return res.status(500).json({ message: 'Algo deu errado' })
    }
  }

  return res.send('Method not allowed.')
}
