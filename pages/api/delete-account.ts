import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      const session = await getSession({ req })

      if (!session) {
        return res.status(403).send('Unauthorized')
      }

      await prisma.user.delete({
        where: {
          email: session.user.email
        }
      })

      return res.status(200).send('Account deleted')
    } catch {
      return res.status(500).json({ message: 'Algo deu errado' })
    }
  }

  return res.send('Method not allowed.')
}
