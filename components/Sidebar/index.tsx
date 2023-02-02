import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import { useMutation } from 'react-query'
import { useKBar } from 'kbar'
import useSound from 'use-sound'
// TODO: create DropdownMenu component
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { useStore } from '@/hooks'

import {
  HomeIcon,
  BookmarkIcon,
  GuestbookIcon,
  SnippetIcon,
  StackIcon,
  JSIcon,
  ReactIcon,
  GitbubIcon,
  LinkedinIcon,
  TwitterIcon,
  SteamIcon,
  CloseIcon,
  ConfigIcon,
  SpinnerIcon
} from '@/icons'
import { RiCommandFill } from 'react-icons/ri'
import { NowPlaying, ToggleThemeButton, Tooltip, AlertDialog } from '@/components'

import { SidebarLink } from './SidebarLink'
import { SidebarOverlay } from './SidebarOverlay'

import commandBarSound from '../../public/sounds/command-bar.mp3'

const glassEffect =
  'backdrop-filter dark:backdrop-filter backdrop-blur-lg dark:backdrop-blur-lg bg-opacity-20 dark:bg-opacity-50'

export default function Sidebar() {
  const isOpenSidebar = useStore((state) => state.isOpenSidebar)
  const closeSidebar = useStore((state) => state.closeSidebar)
  const openSignInDialog = useStore((state) => state.openSignInDialog)

  const { data: session } = useSession()
  const router = useRouter()
  const { query } = useKBar()
  const [commandBarSoundPlay] = useSound(commandBarSound)

  const [mounted, setMounted] = React.useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)

  const deleteAccount = useMutation(
    async () => {
      const response = await fetch(`/api/delete-account`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const { message } = await response.json()
        throw new Error(message)
      }
    },
    {
      onSuccess: () => {
        setDeleteDialogOpen(false)
        signOut()
      }
    }
  )

  function onDeleteAccount(event: React.MouseEvent) {
    event.preventDefault()

    if (deleteAccount.isLoading) return

    deleteAccount.mutate()
  }

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const links = [
    {
      icon: HomeIcon,
      label: 'Início',
      href: '/',
      isActive: router.asPath === '/',
      isExternal: false
    },
    'Eu',
    {
      icon: BookmarkIcon,
      label: 'Bookmarks',
      href: '/bookmarks',
      isActive: router.pathname.startsWith('/bookmarks'),
      isExternal: false
    },
    {
      icon: GuestbookIcon,
      label: 'Guestbook',
      href: '/guestbook',
      isActive: router.pathname.startsWith('/guestbook'),
      isExternal: false
    },
    {
      icon: SnippetIcon,
      label: 'Snippets',
      href: '/snippets',
      isActive: router.pathname.startsWith('/snippets'),
      isExternal: false
    },
    {
      icon: StackIcon,
      label: 'Stack',
      href: '/stack',
      isActive: router.pathname.startsWith('/stack'),
      isExternal: false
    },
    'Projetos',
    {
      icon: JSIcon,
      label: 'JavaScript',
      href: '/projetos/javascript',
      isActive: router.pathname.startsWith('/projetos/javascript'),
      isExternal: false
    },
    {
      icon: ReactIcon,
      label: 'React & Next',
      href: '/projetos/react-next',
      isActive: router.pathname.startsWith('/projetos/react-next'),
      isExternal: false
    },
    'Sociais',
    {
      icon: GitbubIcon,
      label: 'GitHub',
      href: 'https://github.com/joaom00',
      isExternal: true
    },
    {
      icon: LinkedinIcon,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/joaom00/',
      isExternal: true
    },
    {
      icon: TwitterIcon,
      label: 'Twitter',
      href: 'https://twitter.com/joaom__00',
      isExternal: true
    },
    {
      icon: SteamIcon,
      label: 'Steam',
      href: 'https://steamcommunity.com/id/negatlv3',
      isExternal: true
    }
  ]

  if (mounted) {
    const isMac = /(Mac)/i.test(navigator.userAgent)

    return (
      <>
        <nav
          className={`${
            isOpenSidebar
              ? 'absolute inset-y-0 left-0 translate-x-0 shadow-lg'
              : 'absolute -translate-x-full'
          } 3xl:w-80 z-30 flex h-full max-h-screen min-h-screen w-3/4 flex-none transform flex-col overflow-y-auto border-r border-mauve6 bg-white pb-10 transition duration-200 ease-in-out dark:border-mauveDark6 dark:bg-mauveDark1 sm:w-1/2 sm:pb-0 md:w-1/3 lg:relative lg:z-auto lg:w-56 lg:translate-x-0 2xl:w-72`}
        >
          <div
            className={`sticky top-0 space-y-3 border-b border-mauve6 bg-mauve1 p-3 dark:border-mauveDark6 dark:bg-mauveDark1 ${glassEffect}`}
          >
            <div className="flex items-center gap-3">
              <button
                aria-label="Close menu"
                className="rounded-md p-2 text-slate12 hover:bg-mauve4 dark:text-slateDark12 dark:hover:bg-mauveDark4 lg:hidden"
                onClick={closeSidebar}
              >
                <CloseIcon aria-hidden />
              </button>
              <p className="text-sm font-medium">João Pedro Magalhães</p>
              <Tooltip content={<KeyboardInput isMac={isMac} />} side="right" className="bg-gray-3">
                <button
                  className="ml-auto rounded-md p-1"
                  onClick={() => {
                    commandBarSoundPlay()
                    query.toggle()
                  }}
                >
                  <RiCommandFill size={14} aria-hidden />
                </button>
              </Tooltip>
            </div>
            <div>
              <NowPlaying />
            </div>
          </div>
          <ul className="flex-1 space-y-1 p-3">
            {links.map((link, i) => {
              if (typeof link === 'string') {
                return (
                  <li
                    key={i}
                    className="px-2 pt-5 pb-2 text-xs font-semibold text-slate11 dark:text-slateDark11"
                  >
                    {link}
                  </li>
                )
              }

              return <SidebarLink key={i} {...link} />
            })}
          </ul>

          <div
            className={`sticky bottom-0 flex items-center justify-between border-t border-mauve6 bg-mauve1 p-3 dark:border-mauveDark6 dark:bg-mauveDark1 ${glassEffect}`}
          >
            {session ? (
              <div className="h-6 w-6 overflow-hidden rounded-full">
                <Image
                  src={session.user.image}
                  alt={`Foto de perfil de ${session.user.name}`}
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <button
                className="relative rounded-md bg-mauve2 px-5 py-1.5 text-sm transition duration-200 dark:bg-mauveDark2"
                onClick={openSignInDialog}
              >
                Fazer login
              </button>
            )}
            <div className="flex items-center gap-3">
              <ToggleThemeButton />
              {session && (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button
                      aria-label="Configurações"
                      className="rounded-lg bg-mauve4 bg-opacity-0 p-2 text-sm transition duration-200 hover:bg-opacity-100 dark:bg-mauveDark4 dark:bg-opacity-0 dark:hover:bg-opacity-100"
                    >
                      <ConfigIcon aria-hidden />
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content
                    side="right"
                    align="end"
                    hidden={deleteDialogOpen}
                    className="w-36 animate-dropdownMenuShow rounded-md border border-gray-6 bg-gray-3 py-1.5"
                  >
                    <AlertDialog.Root open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                      <AlertDialog.Trigger asChild>
                        <DropdownMenu.Item
                          className="flex select-none items-center rounded-sm py-1.5 pl-4 pr-7 text-sm outline-none focus:bg-violet-9"
                          onSelect={(event) => event.preventDefault()}
                        >
                          Deletar conta
                        </DropdownMenu.Item>
                      </AlertDialog.Trigger>
                      <AlertDialog.Content
                        title="Você tem certeza disso?"
                        description="Essa ação não poderá ser desfeita. A sua conta será deletada permanentemente e os dados não poderão ser restaurados."
                      >
                        <div className="mt-5 flex justify-end gap-5">
                          <AlertDialog.Cancel
                            className="rounded-md bg-gray-3 py-2 px-3 hover:bg-gray-4"
                            disabled={deleteAccount.isLoading}
                          >
                            Cancelar
                          </AlertDialog.Cancel>
                          <AlertDialog.Action
                            className="flex items-center gap-3 rounded-md bg-red-700 py-2 px-3 text-white hover:opacity-90"
                            onClick={onDeleteAccount}
                          >
                            {deleteAccount.isLoading && <SpinnerIcon />}
                            Deletar conta
                          </AlertDialog.Action>
                        </div>
                      </AlertDialog.Content>
                    </AlertDialog.Root>
                    <DropdownMenu.Item
                      className="flex cursor-pointer items-center rounded-sm py-1.5 pl-4 pr-7 text-sm outline-none focus:bg-violet4 dark:focus:bg-violetDark4"
                      onSelect={() => signOut()}
                    >
                      Sair da conta
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              )}
            </div>
          </div>
        </nav>
        <SidebarOverlay />
      </>
    )
  }

  return <div />
}

function KeyboardInput({ isMac }: { isMac: boolean }) {
  if (isMac) {
    return (
      <>
        <kbd className="mr-1 text-xs">⌘ +</kbd>{' '}
        <kbd className="bg-gray-0 text-xs text-current text-slate-200">k</kbd>
      </>
    )
  }

  return (
    <>
      <kbd className="mr-1 text-xs">ctrl +</kbd> <kbd className="text-xs">k</kbd>
    </>
  )
}
