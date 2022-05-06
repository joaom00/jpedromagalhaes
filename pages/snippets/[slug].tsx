import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { allSnippets } from '.contentlayer/data'

import { fetchComments } from '@/shared/queries'
import { fetchDetail } from '@/lib/useDetailQuery'

import { MainLayout } from '@/layouts'
import { Snippets, SnippetsDetail } from '@/components/Snippets'

export default function SnippetDetailPage({
  body
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <MainLayout.Root>
      <MainLayout.List hasDetail>
        <Snippets />
      </MainLayout.List>
      <MainLayout.Detail>
        <SnippetsDetail body={body} />
      </MainLayout.Detail>
    </MainLayout.Root>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext<{ slug: string }>) {
  const { slug } = ctx.params!
  const snippet = allSnippets.find((snippet) => snippet.slug === slug)

  const queryClient = new QueryClient()
  console.log(snippet)

  await queryClient.prefetchQuery(
    [{ entity: 'snippets', scope: 'detail', identifier: slug }],
    fetchDetail
  )
  await queryClient.prefetchQuery(
    [{ entity: 'snippets', scope: 'comments', identifier: slug }],
    fetchComments
  )

  return {
    props: {
      body: snippet?.body,
      dehydratedState: dehydrate(queryClient)
    }
  }
}
