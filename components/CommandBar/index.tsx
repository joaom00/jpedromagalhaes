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

import { GitbubIcon, LinkedinIcon, SteamIcon, TwitterIcon } from 'icons'

type CommandBarProps = {
  children: React.ReactNode
}

export default function CommandBar({ children }: CommandBarProps) {
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
      section: 'Go To',
      perform: () => router.push('/')
    },
    {
      id: 'bookmarks',
      name: 'Bookmarks',
      shortcut: ['g', 'b'],
      keywords: 'go bookmarks',
      section: 'Go To',
      perform: () => router.push('/bookmarks')
    },
    {
      id: 'guestbook',
      name: 'Guestbook',
      shortcut: ['g', 'g'],
      keywords: 'go guestbook',
      section: 'Go To',
      perform: () => router.push('/guestbook')
    },
    {
      id: 'snippets',
      name: 'Snippets',
      shortcut: ['g', 's', 'p'],
      keywords: 'go snippets',
      section: 'Go To',
      perform: () => router.push('/snippets')
    },
    {
      id: 'stack',
      name: 'Stack',
      shortcut: ['g', 's'],
      keywords: 'go stack',
      section: 'Go To',
      perform: () => router.push('/stack')
    },
    {
      id: 'github',
      name: 'GitHub',
      shortcut: ['f', 'g'],
      keywords: 'fallow-github',
      section: 'Follow',
      perform: () => window.open('https://github.com/joaom00', '_blank'),
      icon: <GitbubIcon />
    },
    {
      id: 'twitter',
      name: 'Twitter',
      shortcut: ['f', 't'],
      keywords: 'fallow-twitter',
      section: 'Follow',
      perform: () => window.open('https://twitter.com/joaom__00', '_blank'),
      icon: <TwitterIcon />
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      shortcut: ['f', 'l'],
      keywords: 'fallow-linkedin',
      section: 'Follow',
      perform: () => window.open('https://linkedin.com/in/joaom00', '_blank'),
      icon: <LinkedinIcon />
    },
    {
      id: 'steam',
      name: 'Steam',
      shortcut: ['f', 's'],
      keywords: 'fallow-steam',
      section: 'Follow',
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
        <KBarPositioner className="bg-black bg-opacity-60 fixed inset-0 animate-overlayShow backdrop-filter backdrop-blur-sm z-50">
          <KBarAnimator className="max-w-2xl w-full rounded-md overflow-hidden">
            <KBarSearch className="w-full p-4 bg-white dark:bg-gray-900" placeholder="Tente github..." />

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
          <div className="bg-white dark:bg-gray-900 px-3 py-1">
            <span className="text-xs uppercase font-medium tracking-widest">{item}</span>
          </div>
        ) : (
          <div
            className={`flex justify-between items-center p-5 cursor-pointer ${
              active
                ? 'bg-gray-250 dark:bg-gray-800 border-l-2 border-blue-600'
                : 'bg-white dark:bg-gray-900 text-gray-500'
            }`}
          >
            <span className="flex items-center gap-3 leading-none font-medium">
              {item.icon && item.icon}
              {item.name}
            </span>
            {Boolean(item.shortcut?.length) && (
              <div className="space-x-2">
                {item.shortcut?.map((key: string, index) => (
                  <span
                    className="py-1 px-2 text-blue-600 uppercase bg-slate-200 dark:bg-slate-900 text-xs rounded-md font-medium"
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
