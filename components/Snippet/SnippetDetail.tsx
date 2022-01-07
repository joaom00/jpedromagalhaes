import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { MDX } from '.contentlayer/types'

import type { SnippetDetail } from 'shared/types'
import { useDetailQuery } from 'shared/queries'

import { TitleBar, MDXComponents, Image } from 'components'
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
      <>
        <Head>
          <title>{`Snippets | ${snippetQuery.data.title}`}</title>
        </Head>
        <div ref={scrollContainerRef} className="relative flex flex-col w-full max-h-screen overflow-y-auto">
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
          <article className="p-8 overflow-x-hidden">
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
          <Comments scope="snippets" identifier={slug} scrollContainerRef={scrollContainerRef} />
        </div>
      </>
    )
  }

  return null
}
