import React from 'react'
import Link from 'next/link'

import { CompassIcon } from 'icons'
import { Container, TitleBar } from 'components'

export default function NotFoundTemplate() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (mounted) {
    const isMac = /(Mac)/i.test(navigator.userAgent)

    return (
      <Container title="João Pedro Magalhães - Desenvolvedor Front-End, UI/UX entusiasta & Gopher">
        <TitleBar title="Página não encontrada" />
        <div className="flex h-full flex-1 flex-col items-center justify-center space-y-6 px-8 text-center lg:px-16">
          <CompassIcon size={32} aria-hidden />
          <div className="flex max-w-3xl flex-col space-y-1">
            <p className="mb-3 font-semibold">O que você está procurando não existe.</p>
            <p className="text-gray-400">
              Por que mostrar um 404 genérico quando posso fazer com que pareça misterioso? Parece
              que você encontrou algo que costumava existir, ou você soletrou algo errado. Suponho
              que você soletrou algo errado. Você pode verificar essa URL?
            </p>
          </div>
          <Link href="/">
            <a className="rounded-md border border-gray-300 bg-gray-250 py-2 px-4 text-sm dark:border-gray-700 dark:bg-gray-800">
              Ir para o início
            </a>
          </Link>
          <span>ou</span>
          <span>
            Pressione{' '}
            <kbd className="rounded-md bg-gray-250 p-1.5 dark:bg-gray-800">
              {isMac ? '⌘' : 'ctrl'}
            </kbd>{' '}
            + <kbd className="rounded-md bg-gray-250 p-1.5 dark:bg-gray-800">k</kbd>
          </span>
        </div>
      </Container>
    )
  }

  return <div />
}
