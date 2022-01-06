import { Sidebar } from 'components'

type SiteLayoutProps = {
  children: React.ReactNode
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="relative flex w-full h-full min-h-screen">
      <Sidebar />
      <div className="flex flex-1">{children}</div>
    </div>
  )
}
