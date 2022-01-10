import { useRouter } from 'next/router'

import { CompassIcon } from 'icons'

export default function Error() {
  const router = useRouter()
  return (
    <div className="grid place-items-center w-full text-center">
      <div>
        <CompassIcon className="mx-auto mb-3" size={32} aria-hidden />
        <p>Algo deu errado. Tente novamente mais tarde.</p>
        <p>Estamos tentando resolver o mais rápido possível.</p>
        <button
          className="bg-gray-250 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 py-2 px-4 rounded-md text-sm mt-8"
          onClick={() => router.reload()}
        >
          Recarregar página
        </button>
      </div>
    </div>
  )
}
