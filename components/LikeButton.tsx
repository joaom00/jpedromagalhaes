import React from 'react'
import { useSession } from 'next-auth/react'

import { useStore } from '@/hooks'

import { HeartFillIcon, HeartIcon } from '@/icons'

type LikeButtonProps = {
  id: string
  hasReacted: boolean
  count: number
  loading: boolean
  onClick: () => void
}
export function LikeButton({ id, hasReacted, count, loading, onClick }: LikeButtonProps) {
  const openSignInDialog = useStore((state) => state.openSignInDialog)

  const { data: session } = useSession()

  const [ping, setPing] = React.useState(false)
  const [hasReactedState, setHasReactedState] = React.useState(hasReacted)
  const [currTranslate, setCurrTranslate] = React.useState(
    hasReactedState ? '-translate-y-4' : 'translate-y-0'
  )
  const [nextTranslate, setNextTranslate] = React.useState(
    hasReactedState ? 'translate-y-0' : '-translate-y-4'
  )

  let currCount = count
  let nextCount = hasReactedState ? currCount - 1 : currCount + 1

  let currOpacity = 'opacity-100'
  let nextOpacity = 'opacity-0'

  React.useEffect(() => {
    setHasReactedState(hasReacted)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    currCount = count
    // eslint-disable-next-line react-hooks/exhaustive-deps
    nextCount = hasReacted ? count - 1 : count + 1
    setCurrTranslate(hasReacted ? '-translate-y-4' : 'translate-y-0')
    setNextTranslate(hasReacted ? 'translate-y-0' : '-translate-y-4')
  }, [id, hasReacted])

  function handleClick() {
    if (!session) {
      return openSignInDialog()
    }
    if (loading) return
    setCurrTranslate(nextTranslate)
    setNextTranslate(currTranslate)
    setHasReactedState(!hasReactedState)
    if (!hasReactedState) {
      setPing(true)
      setTimeout(() => setPing(false), 700)
    }
    onClick()
  }

  return (
    <button
      aria-label={hasReactedState ? 'Deixar de curtir' : 'Curtir'}
      onClick={handleClick}
      className="flex flex-none items-center justify-center space-x-2 overflow-hidden rounded-md border border-mauve6 bg-mauve3 px-4 py-2 leading-none transition-all hover:bg-mauve4 dark:border-mauveDark6 dark:bg-mauveDark3 dark:hover:bg-mauveDark4"
    >
      {hasReactedState ? (
        <span className="relative text-red-500">
          {ping && (
            <span className="absolute top-0 left-0 animate-ping">
              <HeartFillIcon aria-hidden />
            </span>
          )}
          <HeartFillIcon aria-hidden />
        </span>
      ) : (
        <span className="text-mauve9 dark:text-mauveDark9">
          <HeartIcon />
        </span>
      )}
      <div className="relative -top-px h-3">
        <div
          className={`flex flex-col items-center justify-center space-y-2 duration-300 ${currTranslate} transform transition-all`}
        >
          {hasReactedState ? (
            <>
              <span className={`h-2 transition-all duration-300 ${nextOpacity}`}>{nextCount}</span>
              <span className={`h-2 transition-all duration-300 ${currOpacity}`}>{currCount}</span>
            </>
          ) : (
            <>
              <span className={`h-2 transition-all duration-300 ${currOpacity}`}>{currCount}</span>
              <span className={`h-2 transition-all duration-300 ${nextOpacity}`}>{nextCount}</span>
            </>
          )}
        </div>
      </div>
    </button>
  )
}
