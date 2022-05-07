import { Image } from '@/components'

import { Stack } from './Stack.types'

export function StackItem({ name, image }: Stack) {
  return (
    <>
      <div className="h-12 w-12 overflow-hidden rounded-xl">
        <Image src={image} alt={`Logo do ${name}`} width={48} height={48} quality={90} />
      </div>
      <p className="text-sm font-medium">{name}</p>
    </>
  )
}
