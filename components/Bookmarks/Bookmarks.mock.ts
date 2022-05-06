import { rest } from 'msw'

type BookmarkResponse = {
  title: string
  description: string
  url: string
  host: string
  faviconUrl: string
}

export const bookmarkHandlers = [
  rest.get('/api/bookmarks', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(generateMockedResponse()))
  }),
  rest.post<string, BookmarkResponse>('/api/bookmarks', (req, res, ctx) => {
    const { data } = JSON.parse(req.body)

    return res(
      ctx.json({
        ...data
      })
    )
  }),
  rest.patch('/api/bookmarks/:id', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ title: 'mocked title' }))
  })
]

export function generateMockedResponse() {
  return {
    nextCursor: '3',
    bookmarks: [
      {
        id: '1',
        title: 'Why We Memo All the Things',
        faviconUrl: 'https://res.cloudinary.com/dubkeylyq/image/upload/v1641826529/link_gjrwna.png',
        host: 'attardi.org'
      },
      {
        id: '2',
        title: 'Compound Components',
        faviconUrl:
          'https://res.cloudinary.com/dubkeylyq/image/upload/v1642801573/jjenzz-favicon_ntdzq4.png',
        host: 'jjenzz.com'
      },
      {
        id: '3',
        title: 'Are You a Component Control Freak?',
        faviconUrl:
          'https://res.cloudinary.com/dubkeylyq/image/upload/v1642801573/jjenzz-favicon_ntdzq4.png',
        host: 'jjenzz.com'
      }
    ]
  }
}
