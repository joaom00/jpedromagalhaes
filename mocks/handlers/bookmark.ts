import { rest } from 'msw'
import { faker } from '@faker-js/faker'

const bookmark = {
  id: faker.datatype.uuid(),
  title: 'mocked-title',
  url: 'https://mocked-url.com',
  host: 'mocked-domain.com',
  faviconUrl: faker.internet.url(),
  description: 'mocked-description',
  _count: {
    reactions: 2
  }
}

export const bookmarkHandlers = [
  rest.get('/api/bookmarks', (_req, res, ctx) => {
    return res(
      ctx.json({
        bookmarks: Array(3).map(() => bookmark)
      })
    )
  }),
  rest.get('/api/bookmarks/:id', (_req, res, ctx) => res(ctx.json(bookmark))),
  rest.post('/api/bookmarks', (req, res, ctx) => {
    const { data } = JSON.parse(req.body as string)

    return res(ctx.json(data))
  })
]
