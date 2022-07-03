import { createWrapper, renderWithClient } from '@/test/utils'
import { renderHook, act } from '@testing-library/react-hooks'
import { useCreateBookmark } from './Bookmarks.queries'
import { faker } from '@faker-js/faker'
import { server } from '@/.jest/setup'
import { rest } from 'msw'
import { Bookmarks, BookmarksDetail } from '.'
import { SessionProvider } from 'next-auth/react'

const intersectionObserverMock = () => ({
  observe: () => null,
  unobserve: () => null
})
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock)
jest.mock('next/router', () => require('next-router-mock'))

describe('Bookmarks', () => {
  it("should render an error message in bookmark's list", async () => {
    server.use(rest.get('/api/bookmarks', (_req, res, ctx) => res(ctx.status(500))))

    const screen = renderWithClient(
      <SessionProvider
        session={{
          expires: Date.now().toString(),
          user: { name: 'joao', email: 'joao@email.com', image: 'image.png', role: 'USER' }
        }}
      >
        <Bookmarks />
      </SessionProvider>
    )

    expect(
      await screen.findByText(/algo deu errado. tente novamente mais tarde./i)
    ).toBeInTheDocument()
  })

  it("should render bookmark's detail", async () => {
    const screen = renderWithClient(
      <SessionProvider
        session={{
          expires: Date.now().toString(),
          user: { name: 'joao', email: 'joao@email.com', image: 'image.png', role: 'USER' }
        }}
      >
        <BookmarksDetail />
      </SessionProvider>
    )

    expect(await screen.findByRole('heading', { name: 'mocked-title' })).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: /visitar/i })).toHaveAttribute(
      'href',
      'https://mocked-url.com'
    )
    expect(
      await screen.findByRole('img', { name: `Favicon do site mocked-domain.com` })
    ).toBeInTheDocument()

    expect(await screen.findByText('mocked-description')).toBeInTheDocument()
  })

  describe('Hooks', () => {
    it('should create a bookmark', async () => {
      const bookmark = {
        title: faker.lorem.words(1),
        url: faker.internet.url(),
        host: faker.internet.domainName(),
        faviconUrl: faker.internet.url(),
        description: faker.lorem.sentences(1)
      }
      const { result, waitFor } = renderHook(() => useCreateBookmark<typeof bookmark>(), {
        wrapper: createWrapper()
      })

      act(() => result.current.mutate(bookmark))

      await waitFor(() => result.current.isSuccess)

      expect(result.current.data?.title).toBe(bookmark.title)
    })
  })
})
