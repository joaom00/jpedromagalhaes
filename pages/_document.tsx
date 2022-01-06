import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="preload" href="/fonts/ibm-plex-sans-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link href="/favicon.png" rel="shortcut icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
