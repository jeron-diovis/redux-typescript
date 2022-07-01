import { useRef } from 'react'

import { shallowEqual } from 'src/utils'

interface UseInvariantOptions<T> {
  label?: string
  eq?: (a: T, b: T) => boolean
}

export function useInvariant<T>(x: T, opts: UseInvariantOptions<T> = {}): T {
  const { label = 'value', eq = shallowEqual } = opts
  const ref = useRef(x)

  if (!eq(x, ref.current)) {
    const msg = `${label} is not supposed to change during component lifecycle.\nGot change:`
    console.error(`${msg} %o -> %o`, ref.current, x)
    throw new Error(`${msg} ${ref.current} -> ${x}`)
  }

  return x
}
