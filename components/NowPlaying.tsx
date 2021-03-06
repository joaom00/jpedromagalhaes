import React from 'react'

import { SpotifyIcon, AnimatedBars } from '@/icons'

type NowPlaying = {
  album: string
  artist: string
  isPlaying: boolean
  songUrl: string
  title: string
}

export function NowPlaying() {
  const [nowPlaying, setNowPlaying] = React.useState<NowPlaying>()

  React.useEffect(() => {
    async function getNowPlaying() {
      const response = await fetch(`/api/now-playing`)
      const data = await response.json()

      setNowPlaying(data)
    }

    getNowPlaying()
  }, [])

  return (
    <a
      className="flex items-center space-x-3 text-sm"
      href={nowPlaying?.songUrl}
      target="_blank"
      rel="noreferrer noopener"
    >
      {nowPlaying?.isPlaying ? (
        <>
          <AnimatedBars />
          <div className="flex flex-col overflow-hidden whitespace-nowrap">
            <span className="text-sm font-medium text-gray-700 dark:text-white">
              {nowPlaying.title}
            </span>
            <span className="text-xs text-gray-500">{nowPlaying.artist}</span>
          </div>
        </>
      ) : (
        <>
          <SpotifyIcon />
          <span className="dark:text-gray-100">Não está tocando</span>
        </>
      )}
    </a>
  )
}
