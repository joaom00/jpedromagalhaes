import { TitleBar } from 'components'
import React from 'react'

export default function HomeTemplate() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (mounted) {
    const isMac = /(Mac)/i.test(navigator.userAgent)
    return (
      <div className="w-full">
        <TitleBar title="Início" />
        <div className="pt-20 px-4 sm:px-0">
          <div className="flex flex-wrap justify-between items-center max-w-3xl mx-auto">
            <h1 className="text-lg font-bold mb-5 sm:mb-0">Olá, eu sou João Pedro</h1>
            <span className="text-sm font-semibold">
              Pressione <kbd className="p-1.5 bg-gray-250 dark:bg-gray-800 rounded-md">{isMac ? '⌘' : 'ctrl'}</kbd> +{' '}
              <kbd className="p-1.5 bg-gray-250 dark:bg-gray-800 rounded-md">k</kbd> para navegação rápida
            </span>
          </div>
          <div className="prose dark:prose-dark mt-10 w-full max-w-3xl mx-auto">
            <p>
              Desenvolvedor Front End que gosta de UI/UX design e às vezes brincar um pouco no backend, principalmente
              com Go. Além de, desenvolver e contribuir em projetos, vou para a academia, ouço música enquanto estou
              codando, assisto séries, animes e algumas lives de código.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <div />
}
