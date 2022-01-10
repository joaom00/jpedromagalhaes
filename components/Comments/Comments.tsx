import React from 'react'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'

import type { Scope } from 'shared/types'
import { useCommentsQuery } from 'shared/queries'
import { useSignInDialog } from 'contexts'
import { useCreateCommentMutation } from './queries'

import { SendIcon, SpinnerIcon } from 'icons'
import { Textarea, Image } from 'components'

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
        className="border-t border-gray-250 dark:border-gray-800 px-8 py-10 flex flex-col space-y-10 flex-1 relative"
      >
        {Boolean(commentsQuery.data?.length) ? (
          <>
            {commentsQuery.data?.map((comment, index) => (
              <div className="flex space-x-4" key={index}>
                <div className="rounded-full overflow-hidden w-10 h-10">
                  <Image
                    src={comment.author.image as string}
                    width={50}
                    height={50}
                    alt={`Foto de perfil de ${comment.author.name}`}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-nowrap items-center">
                    <span className="font-medium whitespace-nowrap">{comment.author.name}</span>
                    <span className="text-gray-300 shrink ml-3 line-clamp-1">{formatDate(comment.createdAt)}</span>
                    {comment.canEdit && (
                      <CommentMenu
                        scope={scope}
                        identifier={identifier}
                        comment={{ id: comment.id, text: comment.text }}
                      />
                    )}
                  </div>
                  <p className="text-gray-500 dark:text-gray-300 mt-1 whitespace-pre-line">{comment.text}</p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center">
            <p className="text-gray-500">Seja o primeiro a comentar...</p>
          </div>
        )}
      </div>
      <div className="bg-white border-t border-gray-250 dark:border-gray-800 dark:bg-gray-900 pb-10 sm:pb-0 sticky bottom-0 flex flex-col transition duration-300 ease-in-out">
        <form
          className="flex items-center flex-none w-full max-w-3xl px-4 py-4 mx-auto space-x-4 md:px-6"
          onSubmit={handleSubmit}
        >
          <div className="relative flex flex-none w-full">
            <Textarea
              name="comment"
              placeholder="Escreva um comentário..."
              onInputChange={(v) => setValue(v)}
              value={value}
              onKeyDown={onKeyDown}
              style={{ paddingRight: '48px' }}
              className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-md"
            />
            <button
              className="absolute right-1 bottom-1 rounded-md bg-blue-500 p-2 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-30 text-white"
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
