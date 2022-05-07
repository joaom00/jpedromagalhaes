import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { stackQuery } from '@/components/Stack'
import type { Stack } from '@/components/Stack/Stack.types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { cursor } = req.query
    const take = 20

    let stack: Stack[]

    if (cursor) {
      stack = await prisma.stack.findMany({
        take,
        skip: 1,
        cursor: {
          slug: cursor as string
        },
        select: stackQuery.select,
        orderBy: {
          name: 'asc'
        }
      })
    } else {
      stack = await prisma.stack.findMany({
        take,
        select: stackQuery.select,
        orderBy: {
          name: 'asc'
        }
      })
    }

    const nextCursor = stack.length < take ? null : stack[stack.length - 1].slug

    return res.status(200).json({
      stack,
      nextCursor
    })
  }

  if (req.method === 'POST') {
    try {
      const session = await getSession({ req })

      if (!session) {
        return res.status(403).send('Unauthorized')
      }

      if (session.user.role === 'USER') {
        return res.status(403).send('Unauthorized')
      }

      const data = JSON.parse(req.body)

      const tool = await prisma.stack.create({
        data
      })

      return res.status(201).json(tool)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).json({ message: error.message })
      }

      return res.status(500).json({ messge: 'Algo deu errado' })
    }
  }

  return res.send('Method not allowed.')
}
