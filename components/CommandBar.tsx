import React from 'react'
import { useRouter } from 'next/router'
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  Action,
  useMatches
} from 'kbar'
import { useTheme } from 'next-themes'

import {
  GitbubIcon,
  LinkedinIcon,
  StackIcon,
  SteamIcon,
  TwitterIcon,
  HomeIcon,
  BookmarkIcon,
  GuestbookIcon,
  SnippetIcon,
  JSIcon,
  ReactIcon
} from '@/icons'

export interface CommandBarProps {
  children?: React.ReactNode
}

export function CommandBar({ children }: CommandBarProps) {
  const router = useRouter()
  const { setTheme } = useTheme()

  const actions: Action[] = [
    {
      id: 'copy',
      name: 'Copiar URL',
      shortcut: ['u'],
      keywords: 'copy-url',
      section: 'Geral',
      perform: () => navigator.clipboard.writeText(window.location.href)
    },
    {
      id: 'theme',
      name: 'Trocar tema…',
      keywords: 'interface color dark light trocar toggle',
      section: 'Geral'
    },
    {
      id: 'darkTheme',
      name: 'Escuro',
      keywords: 'dark escuro tema theme',
      parent: 'theme',
      shortcut: [],
      perform: () => setTheme('dark')
    },
    {
      id: 'lightTheme',
      name: 'Claro',
      keywords: 'light claro tema theme',
      parent: 'theme',
      shortcut: [],
      perform: () => setTheme('light')
    },
    {
      id: 'inicio',
      name: 'Início',
      shortcut: ['g', 'i'],
      keywords: 'go inicio',
      section: 'Eu',
      perform: () => router.push('/'),
      icon: <HomeIcon />
    },
    {
      id: 'bookmarks',
      name: 'Bookmarks',
      shortcut: ['g', 'b'],
      keywords: 'go bookmarks',
      section: 'Eu',
      perform: () => router.push('/bookmarks'),
      icon: <BookmarkIcon />
    },
    {
      id: 'guestbook',
      name: 'Guestbook',
      shortcut: ['g', 'g'],
      keywords: 'go guestbook',
      section: 'Eu',
      perform: () => router.push('/guestbook'),
      icon: <GuestbookIcon />
    },
    {
      id: 'snippets',
      name: 'Snippets',
      shortcut: ['g', 's', 'p'],
      keywords: 'go snippets',
      section: 'Eu',
      perform: () => router.push('/snippets'),
      icon: <SnippetIcon />
    },
    {
      id: 'stack',
      name: 'Stack',
      shortcut: ['g', 's'],
      keywords: 'go stack',
      section: 'Eu',
      perform: () => router.push('/stack'),
      icon: <StackIcon />
    },
    {
      id: 'javascript-projects',
      name: 'JavaScript',
      shortcut: ['g', 'p', 'j'],
      keywords: 'go javascript js projects',
      section: 'Projetos',
      perform: () => router.push('/projetos/javascript'),
      icon: <JSIcon />
    },
    {
      id: 'react-next-projects',
      name: 'React & Next',
      shortcut: ['g', 'p', 'r'],
      keywords: 'go react next projects',
      section: 'Projetos',
      perform: () => router.push('/projetos/react-next'),
      icon: <ReactIcon />
    },
    {
      id: 'github',
      name: 'GitHub',
      shortcut: ['f', 'g'],
      keywords: 'fallow-github',
      section: 'Sociais',
      perform: () => window.open('https://github.com/joaom00', '_blank'),
      icon: <GitbubIcon />
    },
    {
      id: 'twitter',
      name: 'Twitter',
      shortcut: ['f', 't'],
      keywords: 'fallow-twitter',
      section: 'Sociais',
      perform: () => window.open('https://twitter.com/joaom__00', '_blank'),
      icon: <TwitterIcon />
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      shortcut: ['f', 'l'],
      keywords: 'fallow-linkedin',
      section: 'Sociais',
      perform: () => window.open('https://linkedin.com/in/joaom00', '_blank'),
      icon: <LinkedinIcon />
    },
    {
      id: 'steam',
      name: 'Steam',
      shortcut: ['f', 's'],
      keywords: 'fallow-steam',
      section: 'Sociais',
      perform: () => window.open('https://steamcommunity.com/id/negatlv3', '_blank'),
      icon: <SteamIcon />
    }
  ]
  return (
    <KBarProvider
      actions={actions}
      options={{
        enableHistory: true
      }}
    >
      <KBarPortal>
        <KBarPositioner className="fixed inset-0 z-50 animate-overlayShow bg-black bg-opacity-60 backdrop-blur-sm backdrop-filter">
          <KBarAnimator className="w-full max-w-2xl overflow-hidden rounded-md">
            <KBarSearch
              className="w-full bg-white p-4 dark:bg-mauveDark1"
              placeholder="Tente github..."
            />

            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  )
}

function RenderResults() {
  const { results } = useMatches()

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div className="bg-white px-3 py-1 dark:bg-mauveDark1">
            <span className="text-xs font-medium uppercase tracking-widest text-slate12 dark:text-slateDark12">
              {item}
            </span>
          </div>
        ) : (
          <div
            className={`flex cursor-pointer items-center justify-between p-5 ${
              active
                ? 'border-l-2 border-blue-600 bg-mauve4 dark:bg-mauveDark4'
                : 'bg-white text-slate11 dark:bg-mauveDark1 dark:text-slateDark11'
            }`}
          >
            <span className="flex items-center gap-3 font-medium leading-none">
              {item.icon && item.icon}
              {item.name}
            </span>
            {Boolean(item.shortcut?.length) && (
              <div className="space-x-2">
                {item.shortcut?.map((key: string, index) => (
                  <span
                    className="rounded-md bg-violet4 py-1 px-2 text-xs font-medium uppercase text-violet11 dark:bg-violetDark4 dark:text-violetDark11"
                    key={index}
                  >
                    {key}
                  </span>
                ))}
              </div>
            )}
          </div>
        )
      }
    />
  )
}
