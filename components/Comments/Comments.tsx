import React from 'react'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'

import type { Scope } from '@/shared/types'
import { useCommentsQuery } from '@/shared/queries'
import { useSignInDialog } from '@/contexts'
import { useCreateCommentMutation } from './queries'

import { SendIcon, SpinnerIcon } from '@/icons'
import { Textarea, Image } from '@/components'

const CommentMenu = dynamic(() => import('./CommentMenu'))

type CommentsProps = {
  scope: Scope
  identifier: string
  scrollContainerRef: React.RefObject<HTMLDivElement>
}

export default function Comments({ scope, identifier, scrollContainerRef }: CommentsProps) {
  const commentsContainerRef = React.useRef<HTMLDivElement>(null)
  const [value, setValue] = React.useState('')
  const [cachedValue, setCachedValue] = React.useState('')

  const { data: session } = useSession()
  const commentsQuery = useCommentsQuery(scope, identifier)
  const signInDialog = useSignInDialog()

  const createComment = useCreateCommentMutation()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!session) return signInDialog.setOpen(true)

    if (createComment.isLoading) return

    setCachedValue(value)
    setValue('')
    createComment.mutate(
      { text: value, keys: { scope, identifier } },
      {
        onSuccess: () => {
          setCachedValue('')
          scrollContainerRef.current?.scrollTo({
            behavior: 'smooth',
            top: scrollContainerRef.current.scrollHeight
          })
        },
        onError: (error) => {
          if (error instanceof Error) {
            toast.error(error.message)
          }
          setValue(cachedValue)
          setCachedValue('')
        }
      }
    )
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.ctrlKey && e.code === 'Enter') {
      handleSubmit(e)
    }
  }

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(date))
  }

  return (
    <>
      <div
        ref={commentsContainerRef}
        className="relative flex flex-1 flex-col space-y-10 border-t border-mauve6 px-8 py-10 dark:border-mauveDark6"
      >
        {Boolean(commentsQuery.data?.length) ? (
          <>
            {commentsQuery.data?.map((comment, index) => (
              <div className="flex space-x-4" key={index}>
                <div className="h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={comment.author.image as string}
                    width={50}
                    height={50}
                    alt={`Foto de perfil de ${comment.author.name}`}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-nowrap items-center">
                    <span className="whitespace-nowrap font-medium">{comment.author.name}</span>
                    <span className="ml-3 shrink text-slate11 line-clamp-1 dark:text-slateDark11">
                      {formatDate(comment.createdAt)}
                    </span>
                    {comment.canEdit && (
                      <CommentMenu
                        scope={scope}
                        identifier={identifier}
                        comment={{ id: comment.id, text: comment.text }}
                      />
                    )}
                  </div>
                  <p className="mt-1 whitespace-pre-line text-slate12 dark:text-slateDark12">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center">
            <p className="text-slate11 dark:text-slateDark11">Seja o primeiro a comentar...</p>
          </div>
        )}
      </div>
      <div className="sticky bottom-0 flex flex-col border-t border-mauve6 bg-mauve2 pb-10 transition duration-300 ease-in-out dark:border-mauveDark6 dark:bg-mauveDark2 sm:pb-0">
        <form
          className="mx-auto flex w-full max-w-3xl flex-none items-center space-x-4 px-4 py-4 md:px-6"
          onSubmit={handleSubmit}
        >
          <div className="relative flex w-full flex-none">
            <Textarea
              name="comment"
              placeholder="Escreva um comentário..."
              onChange={(event) => setValue(event.target.value)}
              value={value}
              onKeyDown={onKeyDown}
              style={{ paddingRight: '48px' }}
              className="w-full rounded-md bg-mauve3 px-4 py-2 placeholder-slate11 dark:bg-mauveDark3 dark:placeholder-slateDark11"
            />
            <button
              className="absolute right-1 bottom-1 rounded-md bg-blue-500 p-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-30 dark:disabled:bg-gray-600"
              disabled={!Boolean(value.trim())}
            >
              {createComment.isLoading ? <SpinnerIcon /> : <SendIcon className="rotate-90" />}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
