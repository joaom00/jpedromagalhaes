import 'styles/global.css'
import 'styles/prose.css'
import 'styles/nprogress.css'

import React from 'react'
import type { NextPage } from 'next'
import type { AppProps as NextAppProps } from 'next/app'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { Hydrate, MutationCache, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import toast from 'react-hot-toast'

import useSound from 'use-sound'

import { SiteLayout } from 'layouts'
import { NavigationProvider, SignInDialogProvider } from 'contexts'
import { Toast, CommandBar, NProgress } from 'components'

import commandBarSound from '../public/sounds/command-bar.mp3'

type AppProps = NextAppProps & {
  Component: NextPage & {
    title: string
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        mutationCache: new MutationCache({
          onError: (error) => {
            if (error instanceof Error) {
              toast.error(error.message)
            }
          }
        }),
        defaultOptions: {
          queries: {
            retry: false
          }
        }
      })
  )

  queryClient.setQueryDefaults([{ type: 'list' }], {
    staleTime: Infinity
  })
  queryClient.setQueryDefaults([{ type: 'detail' }], {
    staleTime: Infinity
  })
  queryClient.setQueryDefaults([{ type: 'comments' }], {
    staleTime: 1000 * 60 * 3
  })
  queryClient.setQueryDefaults([{ type: 'users' }], {
    staleTime: 1000 * 60 * 3
  })

  const [play] = useSound(commandBarSound)

  const handleEvent = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.ctrlKey && event.code === 'KeyK') {
        play()
      }
    },
    [play]
  )

  React.useEffect(() => {
    window.document.addEventListener('keydown', handleEvent)

    return () => {
      window.document.removeEventListener('keydown', handleEvent)
    }
  }, [handleEvent])

  return (
    <>
      <Head>
        <title>{Component.title}</title>
      </Head>

      <Toast />
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider attribute="class">
              <NavigationProvider>
                <SignInDialogProvider>
                  <CommandBar>
                    <SiteLayout>
                      <Component {...pageProps} />
                      <NProgress />
                    </SiteLayout>
                  </CommandBar>
                </SignInDialogProvider>
              </NavigationProvider>
            </ThemeProvider>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </SessionProvider>
    </>
  )
}
export default MyApp
