import { renderHook } from '@testing-library/react-hooks'
import { useCreateBookmarkMutation, type Bookmark } from './Bookmarks.queries'
import { useListQuery } from '@/lib/useListQuery'
import { server } from '@/mocks/server'
import { rest } from 'msw'
import { generateMockedResponse } from './Bookmarks.mock'
import { createWrapper, renderWithQueryClient } from '@/test/utils'
import { Bookmarks } from '.'
import { NavigationProvider } from '@/contexts'
import { SessionProvider } from 'next-auth/react'

type BookmarkListData = {
  bookmarks: Bookmark[]
  nextCursor: string
}

jest.mock('next/router', () => require('next-router-mock'))

jest.mock('next-auth/react', () => {
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: 'admin' }
  }
  return {
    __esModule: true,
    ...jest.requireActual('next-auth/react'),
    useSession: jest.fn(() => ({
      data: mockSession,
      status: 'authenticated'
    }))
  }
})

const mock = function () {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn()
  }
}

// window.IntersectionObserver = mock

describe('Bookmarks', () => {
  it('should pass', async () => {
    const result = renderWithQueryClient(
      <SessionProvider>
        <NavigationProvider>
          <Bookmarks />
        </NavigationProvider>
      </SessionProvider>
    )

    expect(await result.findByText(/bookmarks/i)).toBeInTheDocument()
  })
  describe('useListQuery', () => {
    it('should return the correct data for a successful query', async () => {
      const { result, waitFor } = renderHook(() => useListQuery<BookmarkListData>('bookmarks'), {
        wrapper: createWrapper()
      })

      await waitFor(() => result.current.isSuccess)

      expect(result.current.data?.pages).toStrictEqual([generateMockedResponse()])
    })

    it('should fetch next page', async () => {
      const { result, waitFor } = renderHook(() => useListQuery<BookmarkListData>('bookmarks'), {
        wrapper: createWrapper()
      })

      await waitFor(() => result.current.isSuccess)
      console.log(result.current.data)

      // expect(result.current.data?.pages).toStrictEqual([generateMockedResponse()])

      // result.current.fetchNextPage()

      // await waitFor(() => result.current.isFetching)
      // await waitFor(() => !result.current.isFetching)

      // expect(result.current.data?.pages).toStrictEqual([
      //   generateMockedResponse(),
      //   generateMockedResponse()
      // ])
    })

    it('should throw an error', async () => {
      server.use(
        rest.get('*', (_, res, ctx) => {
          return res(ctx.status(500))
        })
      )
      const { result, waitFor } = renderHook(() => useListQuery<BookmarkListData>('bookmarks'), {
        wrapper: createWrapper()
      })

      await waitFor(() => result.current.isError)

      expect(result.current.error).toBeDefined()
    })
  })

  describe.skip('useCreateBookmarkMutation', () => {
    it('should return the correct data for a successful query', async () => {
      const { result, waitFor } = renderHook(() => useCreateBookmarkMutation(), {
        wrapper: createWrapper()
      })

      const bookmark = {
        title: 'bookmark title',
        url: 'bookmark url',
        host: 'bookmark host',
        faviconUrl: 'bookmark faviconurl',
        description: 'bookmark description'
      }

      result.current.mutate(bookmark)

      await waitFor(() => result.current.isSuccess)

      expect(result.current.data).toStrictEqual(bookmark)
    })
    it('should throw an error', async () => {
      server.use(
        rest.post('*', (_, res, ctx) => {
          return res(ctx.status(500))
        })
      )
      const { result, waitFor } = renderHook(() => useCreateBookmarkMutation(), {
        wrapper: createWrapper()
      })

      const bookmark = {
        title: 'bookmark title',
        url: 'bookmark url',
        host: 'bookmark host',
        faviconUrl: 'bookmark faviconurl',
        description: 'bookmark description'
      }

      result.current.mutate(bookmark)

      await waitFor(() => result.current.isError)

      expect(result.current.error).toBeDefined()
    })
  })
})
