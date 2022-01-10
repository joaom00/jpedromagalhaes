import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="preload" href="/fonts/ibm-plex-sans-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link href="/static/favicons/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/static/favicons/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/static/favicons/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link color="#4a9885" href="/static/favicons/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#ffffff" name="theme-color" />
        <meta content="#ffffff" name="msapplication-TileColor" />
        <meta property="og:image" content="https://jpedromagalhaes.vercel.app/static/images/banner.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="João Pedro Magalhães" />
        <meta property="og:description" content="Desenvolvedor frontend, UI/UX entusiasta & Gopher" />
        <meta property="og:title" content="João Pedro Magalhães - Desenvolvedor frontend, UI/UX entusiasta & Gopher" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
