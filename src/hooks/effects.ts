import React from 'react'

export function useOnMount(fn: React.EffectCallback): void {
  // always empty dependencies list, so effect will never ever be executed again
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(fn, [])
}

export function useOnMountLayout(fn: React.EffectCallback): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useLayoutEffect(fn, [])
}

export function useIsMounted(): boolean {
  const [value, setValue] = React.useState(false)
  useOnMountLayout(() => {
    setValue(true)
  })
  return value
}
