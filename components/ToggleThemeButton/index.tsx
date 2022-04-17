import { useTheme } from 'next-themes'
import useSound from 'use-sound'

import toggleThemeSound from '../../public/sounds/toggle-theme.mp3'

export default function ToggleThemeButton() {
  const { resolvedTheme, setTheme } = useTheme()
  const [toggleThemeSoundPlay] = useSound(toggleThemeSound)

  return (
    <button
      aria-label={resolvedTheme === 'dark' ? 'Trocar para tema claro' : 'Trocar para tema escuro'}
      className="theme-toggle bg-gray-200 bg-opacity-0 hover:bg-opacity-100 transition duration-200 dark:bg-gray-800 dark:bg-opacity-0 dark:hover:bg-opacity-100 text-sm rounded-lg p-2 text-gray-700 dark:text-white"
      onClick={() => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
        toggleThemeSoundPlay()
      }}
    >
      <SunMoonIcon />
    </button>
  )
}

function SunMoonIcon() {
  return (
    <svg className="sun-and-moon" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24">
      <mask className="moon" id="moon-mask">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <circle cx="24" cy="10" r="6" fill="black" />
      </mask>
      <circle className="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
      <g className="sun-beams" stroke="currentColor">
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </g>
    </svg>
  )
}
