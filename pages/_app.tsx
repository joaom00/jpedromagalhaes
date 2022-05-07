import 'styles/global.css'
import 'styles/prose.css'
import 'styles/nprogress.css'
import '../components/ToggleThemeButton/sun-and-moon.css'

import React from 'react'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { Hydrate, MutationCache, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import toast from 'react-hot-toast'

import useSound from 'use-sound'

import { SiteLayout } from '@/layouts'
import { Toast, Progress, CommandBar, SignInDialog } from '@/components'

import commandBarSound from '../public/sounds/command-bar.mp3'

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

  queryClient.setQueryDefaults([{ scope: 'list' }], {
    staleTime: Infinity
  })
  queryClient.setQueryDefaults([{ scope: 'detail' }], {
    staleTime: Infinity
  })
  queryClient.setQueryDefaults([{ scope: 'comments' }], {
    staleTime: 1000 * 60 * 3
  })
  queryClient.setQueryDefaults([{ scope: 'users' }], {
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
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider attribute="class">
              <CommandBar>
                <SiteLayout>
                  <Component {...pageProps} />
                  <SignInDialog />
                  <Toast />
                  <Progress />
                </SiteLayout>
              </CommandBar>
            </ThemeProvider>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </SessionProvider>
    </>
  )
}
export default MyApp
