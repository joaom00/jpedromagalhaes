import { MainLayout } from '@/layouts'
import { HomeTemplate } from '@/templates'

export default function Home() {
  return (
    <MainLayout.Root>
      <MainLayout.Detail>
        <HomeTemplate />
      </MainLayout.Detail>
    </MainLayout.Root>
  )
}
