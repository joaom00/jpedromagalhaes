import { useNavigation } from 'contexts'

export function SidebarOverlay() {
  const { open, setOpen } = useNavigation()

  return (
    <div
      className={`fixed bg-black bg-opacity-5 dark:bg-opacity-50 transition duration-200 ease-in-out inset-0 z-20 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={() => setOpen(false)}
    />
  )
}
