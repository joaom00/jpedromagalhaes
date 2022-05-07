import { useRouter } from 'next/router'

import { CompassIcon } from '@/icons'

export function Error() {
  const router = useRouter()
  return (
    <div className="grid w-full place-items-center text-center">
      <div>
        <CompassIcon className="mx-auto mb-3" size={32} aria-hidden />
        <p>Algo deu errado. Tente novamente mais tarde.</p>
        <p>Estamos tentando resolver o mais rápido possível.</p>
        <button
          className="mt-8 rounded-md border border-gray-300 bg-gray-250 py-2 px-4 text-sm dark:border-gray-700 dark:bg-gray-800"
          onClick={() => router.reload()}
        >
          Recarregar página
        </button>
      </div>
    </div>
  )
}
