import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import { useMutation } from 'react-query'
import { useKBar } from 'kbar'
import useSound from 'use-sound'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

import { useNavigation, useSignInDialog } from 'contexts'

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
} from 'icons'
import { RiCommandFill } from 'react-icons/ri'
import { NowPlaying, ToggleThemeButton } from 'components'

import { SidebarLink } from './SidebarLink'
import { SidebarOverlay } from './SidebarOverlay'

import commandBarSound from '../../public/sounds/command-bar.mp3'

const Tooltip = dynamic(() => import('components/Tooltip'))
const AlertDialog = dynamic(() => import('components/AlertDialog'))

const glassEffect =
  'backdrop-filter dark:backdrop-filter backdrop-blur-lg dark:backdrop-blur-lg bg-opacity-20 dark:bg-opacity-50'

export default function Sidebar() {
  const [mounted, setMounted] = React.useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)

  const { data: session } = useSession()
  const router = useRouter()
  const { query } = useKBar()
  const [commandBarSoundPlay] = useSound(commandBarSound)

  const navigation = useNavigation()
  const signInDialog = useSignInDialog()

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
            navigation.open ? 'absolute inset-y-0 left-0 translate-x-0 shadow-lg' : 'absolute -translate-x-full'
          } lg:relative flex flex-none flex-col lg:translate-x-0 w-3/4 sm:w-1/2 md:w-1/3 lg:w-56 2xl:w-72 3xl:w-80 z-30 lg:z-auto max-h-screen h-full min-h-screen overflow-y-auto transition duration-200 ease-in-out transform border-r pb-10 sm:pb-0 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900`}
        >
          <div
            className={`sticky top-0 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-3 space-y-3 ${glassEffect}`}
          >
            <div className="flex items-center gap-3">
              <span
                className="text-gray-300 p-2 rounded-md lg:hidden dark:hover:bg-gray-800"
                onClick={() => navigation.setOpen(false)}
              >
                <CloseIcon />
              </span>
              <p className="text-sm font-medium text-gray-700 dark:text-white">João Pedro Magalhães</p>
              <Tooltip
                content={<KeyboardInput isMac={isMac} />}
                side="right"
                contentClassName="bg-gray-250 dark:bg-gray-800"
                arrowClassName="fill-gray-250 dark:fill-gray-800"
              >
                <button
                  aria-hidden
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
          <ul className="space-y-1 p-3 flex-1">
            {links.map((link, i) => {
              if (typeof link === 'string') {
                return (
                  <li key={i} className="px-2 pt-5 pb-2 text-xs font-semibold text-gray-500">
                    {link}
                  </li>
                )
              }

              return <SidebarLink key={i} {...link} />
            })}
          </ul>

          <div
            className={`sticky p-3 bottom-0 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center ${glassEffect}`}
          >
            {session ? (
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <Image
                  src={session.user.image}
                  alt={`Foto de perfil de ${session.user.name}`}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <button
                className="relative bg-zinc-200 dark:bg-gray-800 text-sm rounded-md px-5 py-1.5 dark:text-gray-300 group-hover:text-gray-50 transition duration-200"
                onClick={() => signInDialog.setOpen(true)}
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
                      aria-label="Sair da conta"
                      className="bg-gray-200 bg-opacity-0 hover:bg-opacity-100 transition duration-200 dark:bg-gray-800 dark:bg-opacity-0 dark:hover:bg-opacity-100 text-sm rounded-lg p-2 text-gray-600 dark:text-white"
                    >
                      <ConfigIcon aria-hidden />
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content
                    side="right"
                    align="end"
                    className="bg-neutral-200 dark:bg-gray-900 rounded-md py-1.5 w-36 border border-neutral-300 dark:border-gray-800 animate-dropdownMenuShow"
                  >
                    <DropdownMenu.Item
                      className="text-sm cursor-pointer focus:bg-blue-600 focus:text-white pl-4 pr-7 py-1.5 outline-none rounded-sm flex items-center"
                      onSelect={() => setDeleteDialogOpen(true)}
                    >
                      Deletar conta
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      className="text-sm cursor-pointer focus:bg-blue-600 focus:text-white pl-4 pr-7 py-1.5 outline-none rounded-sm flex items-center"
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
        <AlertDialog
          title="Você tem certeza disso?"
          description="Essa ação não poderá ser desfeita. A sua conta será deletada permanentemente e os dados não poderão ser restaurados."
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        >
          <div className="flex justify-end mt-5 gap-5">
            <AlertDialogPrimitive.Cancel
              className="py-2 px-3 rounded-md bg-gray-250 dark:bg-gray-700 hover:opacity-90"
              disabled={deleteAccount.isLoading}
            >
              Cancelar
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action
              className="py-2 px-3 rounded-md bg-red-700 text-white hover:opacity-90 flex items-center gap-3"
              onClick={onDeleteAccount}
            >
              {deleteAccount.isLoading && <SpinnerIcon />}
              Deletar conta
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialog>
      </>
    )
  }

  return <div />
}

function KeyboardInput({ isMac }: { isMac: boolean }) {
  if (isMac) {
    return (
      <>
        <kbd className="text-xs mr-1">⌘ +</kbd> <kbd className="text-xs text-current text-slate-200 bg-gray-0">k</kbd>
      </>
    )
  }

  return (
    <>
      <kbd className="text-xs mr-1">ctrl +</kbd> <kbd className="text-xs">k</kbd>
    </>
  )
}
