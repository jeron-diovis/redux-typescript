import { EffectCallback, useEffect, useLayoutEffect, useState } from 'react'

import { useInvariant } from './useInvariant'

export function useOnMount(
  fn: EffectCallback,
  opts: { layout?: boolean } = {}
): void {
  const isLayout = useInvariant(opts.layout ?? false, {
    label: 'Option "layout"',
  })

  const useEffectHook = isLayout ? useLayoutEffect : useEffect
  // always empty dependencies list, so effect will never ever be executed again
  useEffectHook(fn, [])
}

export function useIsMounted(): boolean {
  const [value, setValue] = useState(false)
  useOnMount(
    () => {
      setValue(true)
    },
    {
      layout: true,
    }
  )
  return value
}
