import { useNavigation } from '@/contexts'

export function SidebarOverlay() {
  const { open, setOpen } = useNavigation()

  return (
    <div
      className={`fixed inset-0 z-20 bg-black bg-opacity-5 transition duration-200 ease-in-out dark:bg-opacity-50 ${
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      onClick={() => setOpen(false)}
    />
  )
}
