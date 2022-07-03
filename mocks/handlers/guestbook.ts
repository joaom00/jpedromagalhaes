import faker from '@faker-js/faker'
import { rest } from 'msw'

const question = {
  id: faker.datatype.uuid(),
  title: 'mocked-title',
  author: {
    name: 'mocked-author-name',
    image: 'https://mocked-author-image.png'
  }
}

export const guestbookHandlers = [
  rest.get('/api/guestbook', (_req, res, ctx) => {
    return res(
      ctx.json({
        questions: Array(3).map(() => question)
      })
    )
  }),
  rest.get('/api/guestbook/:id', (_req, res, ctx) => res(ctx.json(question))),
  rest.post('/api/guestbook', (req, res, ctx) => {
    const data = JSON.parse(req.body as string)

    return res(ctx.json(data))
  })
]
