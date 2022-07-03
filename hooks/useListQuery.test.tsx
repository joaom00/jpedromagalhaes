import { createWrapper } from '@/test/utils'
import { renderHook } from '@testing-library/react-hooks'
import { useListQuery } from './useListQuery'

describe('useListQuery', () => {
  it('should render a list of bookmarks', async () => {
    const { result, waitFor } = renderHook(
      () => useListQuery<{ bookmarks: any[]; nextCursor: string }>('bookmarks'),
      {
        wrapper: createWrapper()
      }
    )

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data?.pages[0].bookmarks).toHaveLength(3)
  })

  it('should render a list of questions', async () => {
    const { result, waitFor } = renderHook(
      () => useListQuery<{ questions: any[]; nextCursor: string }>('guestbook'),
      {
        wrapper: createWrapper()
      }
    )

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data?.pages[0].questions).toHaveLength(3)
  })

  it('should render a list of snippets', async () => {
    const { result, waitFor } = renderHook(
      () => useListQuery<{ snippets: any[]; nextCursor: string }>('snippets'),
      {
        wrapper: createWrapper()
      }
    )

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data?.pages[0].snippets).toHaveLength(3)
  })

  it('should render a list of stack', async () => {
    const { result, waitFor } = renderHook(
      () => useListQuery<{ stack: any[]; nextCursor: string }>('stack'),
      {
        wrapper: createWrapper()
      }
    )

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data?.pages[0].stack).toHaveLength(3)
  })
})
