import React from 'react'
import { useSession } from 'next-auth/react'

import { useSignInDialog } from 'contexts'

import { HeartFillIcon, HeartIcon } from 'icons'

type LikeButtonProps = {
  id: string
  hasReacted: boolean
  count: number
  loading: boolean
  onClick: () => void
}
export default function LikeButton({ id, hasReacted, count, loading, onClick }: LikeButtonProps) {
  const [ping, setPing] = React.useState(false)
  const [hasReactedState, setHasReactedState] = React.useState(hasReacted)
  const [currTranslate, setCurrTranslate] = React.useState(hasReactedState ? '-translate-y-4' : 'translate-y-0')
  const [nextTranslate, setNextTranslate] = React.useState(hasReactedState ? 'translate-y-0' : '-translate-y-4')

  const { data: session } = useSession()
  const signInDialog = useSignInDialog()

  let currCount = count
  let nextCount = hasReactedState ? currCount - 1 : currCount + 1

  let currOpacity = 'opacity-100'
  let nextOpacity = 'opacity-0'

  React.useEffect(() => {
    setHasReactedState(hasReacted)
    currCount = count
    nextCount = hasReacted ? count - 1 : count + 1
    setCurrTranslate(hasReacted ? '-translate-y-4' : 'translate-y-0')
    setNextTranslate(hasReacted ? 'translate-y-0' : '-translate-y-4')
  }, [id, hasReacted])

  function handleClick() {
    if (!session) {
      return signInDialog.setOpen(true)
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
      className="flex space-x-2 flex-none items-center justify-center leading-none transition-all rounded-md border bg-mauve3 dark:bg-mauveDark3 border-mauve6 dark:border-mauveDark6 px-4 py-2 overflow-hidden hover:bg-mauve4 dark:hover:bg-mauveDark4"
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
      <div className="relative h-3 -top-px">
        <div
          className={`flex space-y-2 duration-300 flex-col items-center justify-center ${currTranslate} transform transition-all`}
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
