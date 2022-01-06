import React from 'react'

type Options = IntersectionObserverInit & {
  elementRef: React.RefObject<Element>
  onIntersect?: () => void
  enabled?: boolean
}

export default function useIntersectionObserver({
  elementRef,
  onIntersect,
  enabled = true,
  threshold = 0,
  root = null,
  rootMargin = '0%'
}: Options) {
  const [isVisible, setIsVisible] = React.useState(false)

  const updateEntry = React.useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (onIntersect) {
        entry.isIntersecting && onIntersect()
      }
      setIsVisible(entry.isIntersecting)
    },
    [onIntersect]
  )

  React.useEffect(() => {
    if (!enabled) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerParams)

    const node = elementRef && elementRef.current
    if (!node) return

    observer.observe(node)

    return () => {
      observer.unobserve(node)
    }
  }, [elementRef, enabled, root, rootMargin, threshold, updateEntry])

  return [isVisible]
}
