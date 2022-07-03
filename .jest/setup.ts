import 'whatwg-fetch'
import '@testing-library/jest-dom/extend-expect'
import { setupServer } from 'msw/node'
import { setLogger } from 'react-query'
import { handlers } from '../mocks/handlers'

export const server = setupServer(...handlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {}
})
