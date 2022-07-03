import faker from '@faker-js/faker'
import { rest } from 'msw'

const snippet = {
  id: faker.datatype.uuid(),
  slug: 'mocked-slug',
  title: 'mocked-title',
  logo: 'react.svg'
}

export const snippetHandlers = [
  rest.get('/api/snippets', (_req, res, ctx) => {
    return res(
      ctx.json({
        snippets: Array(3).map(() => snippet)
      })
    )
  }),
  rest.get('/api/snippets/:id', (_req, res, ctx) => res(ctx.json(snippet))),
  rest.post('/api/snippets', (req, res, ctx) => {
    const data = JSON.parse(req.body as string)

    return res(ctx.json(data))
  })
]
