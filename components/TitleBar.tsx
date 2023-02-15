import React from 'react'
import Link from 'next/link'

import { useStore } from '@/hooks'

import { ArrowLeftIcon, MenuIcon } from '@/icons'

type TitleBarProps = {
  title: string
  magicTitle?: boolean
  globalMenu?: boolean
  backButton?: boolean
  backButtonHref?: string
  titleRef?: React.MutableRefObject<HTMLParagraphElement | null>
  scrollContainerRef?: React.MutableRefObject<HTMLDivElement | null>
  trailingAccessory?: React.ReactNode
}

export function TitleBar({
  title,
  globalMenu = true,
  backButton = false,
  backButtonHref = '',
  magicTitle = false,
  titleRef,
  scrollContainerRef,
  trailingAccessory = null
}: TitleBarProps) {
  const openSidebar = useStore((state) => state.openSidebar)

  const [offset, setOffset] = React.useState(200)
  const [opacity, _setOpacity] = React.useState(0)
  const [currentScrollOffset, _setCurrentScrollOffset] = React.useState(0)

  const [initialTitleOffsets, _setInitialTitleOffsets] = React.useState({
    top: 0,
    bottom: 0
  })

  const initialTitleOffsetsRef = React.useRef(initialTitleOffsets)
  const setInitialTitleOffsets = (data: { top: number; bottom: number }) => {
    initialTitleOffsetsRef.current = data
    _setInitialTitleOffsets(data)
  }

  const opacityRef = React.useRef(opacity)
  const setOpacity = (data: number) => {
    opacityRef.current = data
    _setOpacity(data)
  }

  const currentScrollOffsetRef = React.useRef(currentScrollOffset)
  const setCurrentScrollOffset = (data: number) => {
    currentScrollOffsetRef.current = data
    _setCurrentScrollOffset(data)
  }

  const handler = React.useCallback(() => {
    const shadowOpacity = scrollContainerRef?.current && scrollContainerRef.current.scrollTop / 200
    if (shadowOpacity) {
      setCurrentScrollOffset(shadowOpacity > 0.12 ? 0.12 : shadowOpacity)
    }

    if (!titleRef?.current || !initialTitleOffsetsRef?.current) return

    const titleTop = titleRef.current.getBoundingClientRect().top - 48
    const titleBottom = titleRef.current.getBoundingClientRect().bottom - 56
    const initialOffsets = initialTitleOffsetsRef.current

    let offsetAmount = parseFloat((titleBottom / initialOffsets.bottom).toFixed(2)) * 100

    let opacityOffset = parseFloat((titleTop / initialOffsets.top).toFixed(2)) * -1

    setOffset(Math.min(Math.max(offsetAmount, 0), 100))
    setOpacity(opacityOffset)
  }, [titleRef, scrollContainerRef])

  React.useEffect(() => {
    scrollContainerRef?.current?.addEventListener('scroll', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => scrollContainerRef?.current?.removeEventListener('scroll', handler)
  }, [titleRef, scrollContainerRef, handler])

  React.useEffect(() => {
    if (!titleRef?.current || !scrollContainerRef?.current) return
    scrollContainerRef.current.scrollTop = 0
    setOpacity(0)
    setInitialTitleOffsets({
      bottom: titleRef.current.getBoundingClientRect().bottom - 56,
      top: titleRef.current.getBoundingClientRect().top - 48
    })
  }, [title, titleRef, scrollContainerRef])

  return (
    <div
      style={{
        boxShadow: `0 1px 3px rgba(0,0,0,${currentScrollOffset})`,
        minHeight: '48px'
      }}
      className="sticky top-0 z-10 flex h-[60px] items-center justify-between bg-gray-2 px-3 backdrop-blur-xl backdrop-filter"
    >
      <div className="flex flex-1 items-center justify-between">
        <span className="flex items-center space-x-3">
          {globalMenu && (
            <span
              onClick={openSidebar}
              className="flex cursor-pointer items-center justify-center rounded-md p-2 hover:bg-gray-3 lg:hidden"
            >
              <MenuIcon />
            </span>
          )}

          {backButton && (
            <Link href={backButtonHref}>
              <a className="flex items-center justify-center rounded-md p-2 hover:bg-gray-3 lg:hidden">
                <ArrowLeftIcon />
              </a>
            </Link>
          )}

          <p
            style={
              magicTitle
                ? {
                    transform: `translateY(${offset}%)`,
                    opacity: `${opacity}`
                  }
                : {}
            }
            className="text-sm font-semibold text-gray-12"
          >
            {title}
          </p>
        </span>

        {trailingAccessory}
      </div>
    </div>
  )
}
