import React from 'react'
import { useRouter } from 'next/router'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { MDX } from '.contentlayer/types'

import type { SnippetDetail } from 'shared/types'
import { useDetailQuery } from 'shared/queries'

import { SpinnerIcon } from 'icons'
import { TitleBar, MDXComponents, Image, Container, Error } from 'components'
import { Comments } from 'components/Comments'

import SnippetActions from './SnippetActions'

export default function SnippetDetail({ body }: { body: MDX | undefined }) {
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
          trailingAccessory={<SnippetActions snippet={snippetQuery.data} />}
          magicTitle
          titleRef={titleRef}
          scrollContainerRef={scrollContainerRef}
        />
        <div>
          <article className="px-3 lg:px-8 py-8 overflow-x-hidden">
            <div className="flex items-center space-x-4 flex-1">
              <Image
                src={`/logos/${snippetQuery.data.logo}`}
                alt={snippetQuery.data.title}
                width={80}
                height={80}
                className="rounded-2xl"
              />
              <h1 ref={titleRef} className="text-3xl font-semibold flex-1">
                {snippetQuery.data.title}
              </h1>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-6">{snippetQuery.data.description}</p>

            <div className="prose dark:prose-dark w-full">
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
    <div className="grid place-items-center w-full">
      <SpinnerIcon />
    </div>
  )
}
