import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { allSnippets } from '.contentlayer/data'

import { fetchDetail, fetchComments } from 'shared/queries'

import { ListDetailView } from 'layouts'
import { SnippetList, SnippetDetail } from 'components/Snippet'

export default function SnippetDetailPage({ body }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <ListDetailView list={<SnippetList />} hasDetail detail={<SnippetDetail body={body} />} />
}

export async function getServerSideProps(ctx: GetServerSidePropsContext<{ slug: string }>) {
  const { slug } = ctx.params!
  const snippet = allSnippets.find((snippet) => snippet.slug === slug)

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([{ scope: 'snippets', type: 'detail', identifier: slug }], fetchDetail)
  await queryClient.prefetchQuery([{ scope: 'snippets', type: 'comments', identifier: slug }], fetchComments)

  return {
    props: {
      body: snippet?.body,
      dehydratedState: dehydrate(queryClient)
    }
  }
}
