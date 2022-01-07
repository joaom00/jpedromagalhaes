import React from 'react'
import Link from 'next/link'
import { TitleBar } from 'components'
import { CompassIcon } from 'icons'

export default function NotFoundTemplate() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (mounted) {
    const isMac = /(Mac)/i.test(navigator.userAgent)

    return (
      <div className="w-full">
        <TitleBar title="Página não existe" />
        <div className="flex flex-col items-center justify-center flex-1 px-8 space-y-6 text-center lg:px-16 h-full">
          <CompassIcon size={32} aria-hidden />
          <div className="flex flex-col space-y-1 max-w-3xl">
            <p className="font-semibold mb-3">O que você está procurando não existe.</p>
            <p className="text-gray-400">
              Por que mostrar um 404 genérico quando posso fazer com que pareça misterioso? Parece que você encontrou
              algo que costumava existir, ou você soletrou algo errado. Suponho que você soletrou algo errado. Você pode
              verificar essa URL?
            </p>
          </div>
          <Link href="/">
            <a className="bg-gray-250 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 py-2 px-4 rounded-md text-sm">
              Ir para o início
            </a>
          </Link>
          <span>ou</span>
          <span>
            Pressione <kbd className="p-1.5 bg-gray-250 dark:bg-gray-800 rounded-md">{isMac ? '⌘' : 'ctrl'}</kbd> +{' '}
            <kbd className="p-1.5 bg-gray-250 dark:bg-gray-800 rounded-md">k</kbd>
          </span>
        </div>
      </div>
    )
  }

  return <div />
}
