import faker from '@faker-js/faker'
import { rest } from 'msw'

const stack = {
  id: faker.datatype.uuid(),
  slug: 'mocked-slug',
  name: 'mocked-name',
  image: 'https://mocked-image.png'
}

export const stackHandlers = [
  rest.get('/api/stack', (_req, res, ctx) => {
    return res(
      ctx.json({
        stack: Array(3).map(() => stack)
      })
    )
  }),
  rest.get('/api/stack/:id', (_req, res, ctx) => res(ctx.json(stack))),
  rest.post('/api/stack', (req, res, ctx) => {
    const data = JSON.parse(req.body as string)

    return res(ctx.json(data))
  })
]
