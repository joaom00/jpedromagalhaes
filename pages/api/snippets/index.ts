import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { snippetsQuery } from '@/components/Snippets'
import type { Snippet } from '@/components/Snippets'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { cursor } = req.query
    const take = 20

    let snippets: Snippet[]

    if (cursor) {
      snippets = await prisma.snippet.findMany({
        take,
        skip: 1,
        cursor: {
          slug: cursor as string
        },
        select: snippetsQuery.select,
        orderBy: {
          title: 'asc'
        }
      })
    } else {
      snippets = await prisma.snippet.findMany({
        take,
        select: snippetsQuery.select,
        orderBy: {
          title: 'asc'
        }
      })
    }

    const nextCursor = snippets.length < take ? null : snippets[snippets.length - 1].slug

    return res.status(200).json({
      snippets,
      nextCursor
    })
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
