import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

type ContainerProps = {
  children: React.ReactNode
  customClassname?: string
  title?: string
  description?: string
  image?: string
  type?: string
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, customClassname, ...customMeta }, ref) => {
    const router = useRouter()

    const meta = {
      title: 'João Pedro Magalhães - Desenvolvedor frontend, UI/UX entusiasta & Gopher',
      description: 'Desenvolvedor frontend, UI/UX entusiasta & Gopher',
      image: 'https://jpedromagalhaes.vercel.app/static/images/banner.png',
      type: 'website',
      ...customMeta
    }

    return (
      <>
        <Head>
          <title>{meta.title}</title>
          <meta name="robots" content="follow, index" />
          <meta content={meta.description} name="description" />
          <meta property="og:url" content={`https://jpedromagalhaes.vercel.app${router.asPath}`} />
          <link rel="canonical" href={`https://jpedromagalhaes.vercel.app${router.asPath}`} />
          <meta property="og:type" content={meta.type} />
          <meta property="og:site_name" content="João Pedro Magalhães" />
          <meta property="og:description" content={meta.description} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:image" content={meta.image} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@joaom__00" />
          <meta name="twitter:title" content={meta.title} />
          <meta name="twitter:description" content={meta.description} />
          <meta name="twitter:image" content={meta.image} />
        </Head>
        <div
          ref={ref}
          className={`relative flex max-h-screen w-full flex-col overflow-y-auto ${customClassname}`}
        >
          {children}
        </div>
      </>
    )
  }
)

Container.displayName = 'ContainerComponent'
