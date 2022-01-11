import React from 'react'
import { useKBar } from 'kbar'

import { Container, TitleBar } from 'components'

export default function HomeTemplate() {
  const [mounted, setMounted] = React.useState(false)
  const { query } = useKBar()

  const featuredProjects = [
    {
      id: 1,
      title: 'Site pessoal (Este)',
      href: 'https://jpedromagalhaes.vercel.app/'
    },
    {
      id: 2,
      title: 'Antigo portfolio',
      href: 'https://old-jpedromagalhaes.vercel.app/'
    },
    {
      id: 3,
      title: 'Dogs',
      description: 'Instagram para cachorros',
      href: 'https://dogs-ten.vercel.app/'
    }
  ]

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (mounted) {
    const isMac = /(Mac)/i.test(navigator.userAgent)
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent)

    return (
      <Container title="João Pedro Magalhães - Desenvolvedor Front-End, UI/UX entusiasta & Gopher">
        <TitleBar title="Início" />
        <div className="py-12 px-4 sm:px-0 overflow-y-auto">
          <div className="flex flex-wrap justify-between items-center max-w-3xl mx-auto">
            <h2 className="text-lg font-bold mb-5 sm:mb-0">Olá, eu sou João Pedro</h2>
            <span className="text-sm font-semibold cursor-pointer" onClick={() => query.toggle()}>
              {isMobile ? (
                <>Toque para navegação rápida</>
              ) : (
                <>
                  Pressione <kbd className="p-1.5 bg-gray-250 dark:bg-gray-800 rounded-md">{isMac ? '⌘' : 'ctrl'}</kbd>{' '}
                  + <kbd className="p-1.5 bg-gray-250 dark:bg-gray-800 rounded-md">k</kbd> para navegação rápida
                </>
              )}
            </span>
          </div>
          <div className="prose dark:prose-dark mt-10 w-full max-w-3xl mx-auto">
            <p>
              Desenvolvedor Front End que gosta de UI/UX design e às vezes brincar um pouco no backend, principalmente
              com Go. Além de, desenvolver e contribuir em projetos, vou para a academia, ouço música enquanto estou
              codando, assisto séries, animes e algumas lives de código.
            </p>
            <hr />
            <h3>Principais Projetos</h3>
          </div>
          <ul className="flex flex-col gap-3 max-w-3xl mx-auto mt-6">
            {featuredProjects.map((project) => (
              <li key={project.id} className="flex">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="bg-gray-250 dark:bg-gray-800 p-5 rounded-md transform transition-all duration-200 ease-in-out hover:-translate-y-1 w-full"
                >
                  <p className="font-semibold inline-block">{project.title}</p>
                  {!!project.description && <span className="ml-3 text-sm text-gray-300">{project.description}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    )
  }

  return <div />
}
