type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return <div className="flex w-full">{children}</div>
}

type MainLayoutListProps = {
  hasDetail?: boolean
  children?: React.ReactNode
}
const MainLayoutList = ({ children, hasDetail = false }: MainLayoutListProps) => {
  return <div className={hasDetail ? 'hidden md:flex' : 'min-h-screen w-full'}>{children}</div>
}

type MainLayoutDetailProps = {
  children: React.ReactNode
}

const MainLayoutDetail = ({ children }: MainLayoutDetailProps) => {
  return <>{children}</>
}

export { MainLayout as Root, MainLayoutList as List, MainLayoutDetail as Detail }
