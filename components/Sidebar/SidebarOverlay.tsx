import { useStore } from '@/hooks'

export function SidebarOverlay() {
  const isOpenSidebar = useStore((state) => state.isOpenSidebar)
  const closeSidebar = useStore((state) => state.closeSidebar)

  return (
    <div
      className={`fixed inset-0 z-20 bg-black bg-opacity-5 transition duration-200 ease-in-out dark:bg-opacity-50 ${
        isOpenSidebar ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      onClick={closeSidebar}
    />
  )
}
