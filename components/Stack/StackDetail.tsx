import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import type { StackDetail } from '@/shared/types'
import { useUsersQuery } from '@/shared/queries'
import { useDetailQuery } from '@/lib/useDetailQuery'

import { useSignInDialog } from '@/contexts'
import { useUsedByMutation } from '@/hooks'

import { SpinnerIcon } from '@/icons'
import { TitleBar, Image, Tooltip, Container, Error } from '@/components'

import { StackActions } from './StackActions'
const Comments = dynamic(() => import('components/Comments/Comments'))

export function StackDetail() {
  const titleRef = React.useRef(null)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const { data: session } = useSession()
  const router = useRouter()
  const slug = router.query.slug as string

  const toolQuery = useDetailQuery<StackDetail>('stack', slug)
  const usersQuery = useUsersQuery(slug)
  const usedByMutation = useUsedByMutation()
  const signInDialog = useSignInDialog()

  function onUsedByChange() {
    if (session) {
      return usedByMutation.mutate(slug)
    }
    signInDialog.setOpen(true)
  }

  if (toolQuery.isSuccess) {
    return (
      <Container title={`Stack | ${toolQuery.data.name}`} ref={scrollContainerRef}>
        <TitleBar
          title={toolQuery.data.name}
          globalMenu={false}
          backButton
          backButtonHref="/stack"
          trailingAccessory={<StackActions stack={toolQuery.data} />}
          magicTitle
          titleRef={titleRef}
          scrollContainerRef={scrollContainerRef}
        />
        <div className="px-3 py-8 lg:px-8">
          <div className="flex items-center">
            <Image
              src={toolQuery.data.image}
              alt={toolQuery.data.name}
              width={80}
              height={80}
              className="rounded-2xl"
            />
            <h1
              ref={titleRef}
              className="ml-6 flex-1 text-2xl font-semibold tracking-wider xl:text-3xl"
            >
              {toolQuery.data.name}
            </h1>
          </div>
          <p className="mt-6 text-slate11 dark:text-slateDark11">{toolQuery.data.description}</p>

          <a
            href={toolQuery.data.url}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-5 block rounded-md bg-violet9 py-1.5 text-center text-violet12 transition-all duration-200 hover:bg-violet10 dark:bg-violetDark9 dark:text-violetDark12 dark:hover:bg-violetDark10"
          >
            Visitar
          </a>

          <div className="mt-5 flex flex-col overflow-hidden rounded-md border border-mauve6 bg-mauve2 dark:border-mauveDark6 dark:bg-mauveDark2">
            <div className="p-4">
              <span className="text-sm text-slate11 dark:text-slateDark11">
                {usersQuery.data?.users.length} pessoas também usam
              </span>
              <div className="mt-3 flex space-x-2">
                {usersQuery.isSuccess && (
                  <>
                    {usersQuery.data.users.map((user, index) => (
                      <Tooltip
                        key={index}
                        content={<span className="text-sm">{user.name}</span>}
                        side="top"
                        contentClassName="bg-mauve3 dark:bg-mauveDark3"
                        arrowClassName="fill-mauve3 dark:fill-mauveDark3"
                      >
                        <div className="h-8 w-8 overflow-hidden rounded-full">
                          <Image
                            src={user.image as string}
                            alt={`Foto de perfil de ${user.name}`}
                            width={40}
                            height={40}
                          />
                        </div>
                      </Tooltip>
                    ))}
                  </>
                )}
              </div>
            </div>
            <div className="border-t border-mauve6 bg-mauve3 px-4 py-2 dark:border-mauveDark6 dark:bg-mauveDark3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  onChange={onUsedByChange}
                  checked={usersQuery.data?.userAlreadyUse}
                  className="rounded border border-mauve6 bg-mauve2 text-violet6 shadow-sm checked:bg-violet9 focus:ring focus:ring-blue-600 focus:ring-opacity-30 focus:ring-offset-0 dark:border-mauveDark6 dark:bg-mauveDark2 dark:text-violetDark6 dark:checked:bg-violetDark9"
                />
                <span className="text-sm">Eu uso</span>
              </label>
            </div>
          </div>
        </div>
        <Comments scope="stack" identifier={slug} scrollContainerRef={scrollContainerRef} />
      </Container>
    )
  }

  if (toolQuery.isError) {
    return <Error />
  }

  return (
    <div className="grid w-full place-items-center">
      <SpinnerIcon />
    </div>
  )
}
