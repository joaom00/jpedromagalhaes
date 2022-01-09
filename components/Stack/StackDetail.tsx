import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useQuery } from 'react-query'

import type { StackDetail } from 'shared/types'
import { useDetailQuery } from 'shared/queries'
import { fetchUsers } from 'shared/utils'

import { useSignInDialog } from 'contexts'
import { useUsedByMutation } from 'hooks'

import { SpinnerIcon } from 'icons'
import { TitleBar, Image, Tooltip, Container } from 'components'

const Comments = dynamic(() => import('components/Comments/Comments'))
const StackActions = dynamic(() => import('./StackActions'))

export default function StackDetail() {
  const titleRef = React.useRef(null)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const router = useRouter()
  const slug = router.query.slug as string

  const usersQuery = useQuery([{ scope: 'stack', type: 'users', identifier: slug }], fetchUsers)

  const { data: session } = useSession()
  const signInDialog = useSignInDialog()
  const toolQuery = useDetailQuery<StackDetail>('stack', slug)
  const usedByMutation = useUsedByMutation()

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
        <div className="px-3 lg:px-8 py-8">
          <div className="flex items-center">
            <Image
              src={toolQuery.data.image}
              alt={toolQuery.data.name}
              width={80}
              height={80}
              className="rounded-2xl"
            />
            <h1 ref={titleRef} className="text-2xl xl:text-3xl tracking-wider font-semibold flex-1 ml-6">
              {toolQuery.data.name}
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-6">{toolQuery.data.description}</p>

          <a
            href={toolQuery.data.url}
            target="_blank"
            rel="noreferrer noopener"
            className="bg-blue-600 py-1.5 rounded-md text-white mt-5 text-center block hover:bg-opacity-80 transition-all duration-200"
          >
            Visitar
          </a>

          <div className="bg-gray-150 dark:bg-gray-800 flex flex-col border border-gray-250 dark:border-gray-700 rounded-md overflow-hidden mt-5">
            <div className="p-4">
              <span className="text-sm text-gray-400">{usersQuery.data?.users.length} pessoas também usam</span>
              <div className="mt-3 flex space-x-2">
                {usersQuery.isSuccess && (
                  <>
                    {usersQuery.data.users.map((user, index) => (
                      <Tooltip
                        key={index}
                        content={<span className="text-sm">{user.name}</span>}
                        side="top"
                        contentClassName="bg-gray-250 dark:bg-gray-900"
                        arrowClassName="fill-gray-250 dark:fill-gray-900"
                      >
                        <div className="rounded-full overflow-hidden w-8 h-8">
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
            <div className="bg-gray-100 dark:bg-gray-900 px-4 py-2 border-t border-gray-250 dark:border-gray-700">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  onChange={onUsedByChange}
                  checked={usersQuery.data?.userAlreadyUse}
                  className="rounded bg-gray-250 dark:bg-gray-700 text-blue-600 border-transparent shadow-sm focus:border-transparent focus:ring focus:ring-offset-0 focus:ring-blue-600 focus:ring-opacity-30"
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

  if (toolQuery.isLoading) {
    return (
      <div className="grid place-items-center w-full">
        <SpinnerIcon />
      </div>
    )
  }

  return null
}
