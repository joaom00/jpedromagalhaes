import type { NextApiRequest, NextApiResponse } from 'next'

import { getNowPlaying } from 'lib/spotify'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const response = await getNowPlaying()

    if (response.status === 204 || response.status > 400) {
      return res.status(200).json({ isPlaying: false })
    }

    const song = await response.json()

    if (song.item === null) {
      return res.status(200).json({ isPlaying: false })
    }

    const isPlaying = song.is_playing
    const title = song.item.name
    const artist = song.item.artists.map((_artist: { name: string }) => _artist.name).join(', ')
    const album = song.item.album.name
    const songUrl = song.item.external_urls.spotify

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30')

    return res.status(200).json({
      album,
      artist,
      isPlaying,
      songUrl,
      title
    })
  }

  return res.send('Method not allowed.')
}
