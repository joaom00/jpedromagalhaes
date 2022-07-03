import { bookmarkHandlers } from './bookmark'
import { guestbookHandlers } from './guestbook'
import { snippetHandlers } from './snippet'
import { stackHandlers } from './stack'

export const handlers = [
  ...bookmarkHandlers,
  ...guestbookHandlers,
  ...snippetHandlers,
  ...stackHandlers
]
