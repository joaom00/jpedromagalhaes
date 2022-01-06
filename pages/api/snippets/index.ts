import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { Prisma } from '@prisma/client'

import { prisma } from 'lib/prisma'
import { snippetsQuery } from 'shared/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const snippets = await prisma.snippet.findMany({
      select: snippetsQuery.select,
      orderBy: {
        title: 'asc'
      }
    })

    return res.status(200).json(snippets)
  }

  if (req.method === 'POST') {
    try {
      const session = await getSession({ req })

      if (!session) {
        return res.status(401).send('Unauthorized')
      }

      if (session.user.role === 'USER') {
        return res.status(401).send('Unauthorized')
      }

      const { data } = JSON.parse(req.body)

      const snippet = await prisma.snippet.create({
        data
      })

      return res.status(201).json(snippet)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).json({ message: error.message })
      }
      return res.status(500).json({ message: 'Algo deu errado' })
    }
  }

  return res.send('Method not allowed.')
}
