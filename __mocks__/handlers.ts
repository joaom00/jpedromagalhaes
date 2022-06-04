import { rest } from 'msw'

export const handlers = [
  rest.post('/bookmarks', (_req, res, ctx) => {
    return res(
      ctx.json({
        title: 'mock-title'
      })
    )
  })
]
