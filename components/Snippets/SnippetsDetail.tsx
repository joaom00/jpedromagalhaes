import React from 'react'
import { useRouter } from 'next/router'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { MDX } from '.contentlayer/types'

import type { SnippetDetail } from '@/shared/types'

import { SpinnerIcon } from '@/icons'
import { TitleBar, MDXComponents, Image, Container, Error } from '@/components'
import { Comments } from '@/components/Comments'

import { SnippetsActions } from './SnippetsActions'
import { useDetailQuery } from '@/lib/useDetailQuery'

export function SnippetsDetail({ body }: { body: MDX | undefined }) {
  const titleRef = React.useRef(null)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const router = useRouter()
  const slug = router.query.slug as string

  const Component = useMDXComponent(body?.code as string)

  const snippetQuery = useDetailQuery<SnippetDetail>('snippets', slug)

  if (snippetQuery.isSuccess) {
    return (
      <Container title={`Snippets | ${snippetQuery.data.title}`} ref={scrollContainerRef}>
        <TitleBar
          title={snippetQuery.data.title}
          globalMenu={false}
          backButton
          backButtonHref="/snippets"
          trailingAccessory={<SnippetsActions snippet={snippetQuery.data} />}
          magicTitle
          titleRef={titleRef}
          scrollContainerRef={scrollContainerRef}
        />
        <div>
          <article className="overflow-x-hidden px-3 py-8 lg:px-8">
            <div className="flex flex-1 items-center space-x-4">
              <Image
                src={`/logos/${snippetQuery.data.logo}`}
                alt={snippetQuery.data.title}
                width={80}
                height={80}
                className="rounded-2xl"
              />
              <h1 ref={titleRef} className="flex-1 text-3xl font-semibold">
                {snippetQuery.data.title}
              </h1>
            </div>
            <p className="mt-6 text-gray-500 dark:text-gray-400">{snippetQuery.data.description}</p>

            <div className="prose w-full dark:prose-dark">
              <Component components={MDXComponents} />
            </div>
          </article>
        </div>
        <Comments scope="snippets" identifier={slug} scrollContainerRef={scrollContainerRef} />
      </Container>
    )
  }

  if (snippetQuery.isError) {
    return <Error />
  }

  return (
    <div className="grid w-full place-items-center">
      <SpinnerIcon />
    </div>
  )
}
