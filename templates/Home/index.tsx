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

        <div className="overflow-y-auto py-12 px-4 sm:px-0">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between">
            <h2 className="mb-5 text-lg font-bold sm:mb-0">Olá, eu sou João Pedro</h2>
            <span className="cursor-pointer text-sm font-semibold" onClick={() => query.toggle()}>
              {isMobile ? (
                <>Toque para navegação rápida</>
              ) : (
                <>
                  Pressione{' '}
                  <kbd className="rounded-md bg-mauve3 p-1.5 dark:bg-mauveDark3">
                    {isMac ? '⌘' : 'ctrl'}
                  </kbd>{' '}
                  + <kbd className="rounded-md bg-mauve3 p-1.5 dark:bg-mauveDark3">k</kbd> para
                  navegação rápida
                </>
              )}
            </span>
          </div>
          <div className="prose mx-auto mt-10 w-full max-w-3xl dark:prose-dark">
            <p>
              Desenvolvedor Front End que gosta de UI/UX design e às vezes brincar um pouco no
              backend, principalmente com Go. Além de, desenvolver e contribuir em projetos, vou
              para a academia, ouço música enquanto estou codando, assisto séries, animes e algumas
              lives de código.
            </p>
            <hr />
            <h3>Principais Projetos</h3>
          </div>
          <ul className="mx-auto mt-6 flex max-w-3xl flex-col gap-3">
            {featuredProjects.map((project) => (
              <li key={project.id} className="flex">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-full transform rounded-md bg-mauve3 p-5 transition-all duration-200 ease-in-out hover:-translate-y-1 dark:bg-mauveDark3"
                >
                  <p className="inline-block font-semibold">{project.title}</p>
                  {!!project.description && (
                    <span className="ml-3 text-sm text-slate11 dark:text-slateDark11">
                      {project.description}
                    </span>
                  )}
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
