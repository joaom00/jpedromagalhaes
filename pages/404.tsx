import { MainLayout } from '@/layouts'
import { NotFoundTemplate } from '@/templates'

export default function NotFound() {
  return (
    <MainLayout.Root>
      <MainLayout.List hasDetail />
      <MainLayout.Detail>
        <NotFoundTemplate />
      </MainLayout.Detail>
    </MainLayout.Root>
  )
}
