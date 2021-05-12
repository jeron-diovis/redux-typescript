import React from 'react'

export function useOnMount(fn: React.EffectCallback) {
  // always empty dependencies list, so effect will never ever be executed again
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(fn, [])
}

export function useOnMountLayout(fn: React.EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useLayoutEffect(fn, [])
}