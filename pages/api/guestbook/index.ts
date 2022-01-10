import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { prisma } from 'lib/prisma'

import type { Question } from 'shared/types'
import { questionsQuery } from 'shared/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { cursor } = req.query
    const take = 20

    let questions: Question[]

    if (cursor) {
      questions = await prisma.question.findMany({
        take,
        skip: 1,
        cursor: {
          id: cursor as string
        },
        select: questionsQuery.select,
        orderBy: {
          createdAt: 'desc'
        }
      })
    } else {
      questions = await prisma.question.findMany({
        take,
        select: questionsQuery.select,
        orderBy: {
          createdAt: 'desc'
        }
      })
    }

    const nextCursor = questions.length < take ? null : questions[questions.length - 1].id

    return res.status(200).json({
      questions,
      nextCursor
    })
  }

  if (req.method === 'POST') {
    try {
      const session = await getSession({ req })

      if (!session) {
        return res.status(401).send('Unauthorized')
      }

      const data = JSON.parse(req.body)

      const question = await prisma.question.create({
        data: {
          ...data,
          author: {
            connect: {
              email: session.user.email
            }
          }
        }
      })

      return res.status(201).json(question)
    } catch (error) {
      return res.status(500).json({ messge: 'Algo deu errado' })
    }
  }

  return res.send('Method not allowed.')
}
