/* eslint-disable no-console */
import { Cache } from '@react-hook/cache'
import { useMemo, useRef } from 'react'

import {
  SuspenseCacheResolver,
  getDefaultCache,
  useCacheContext,
} from './cache'

export function defaultResolveKey(args: unknown[], fn: () => void) {
  const str_args = args.length === 0 ? '' : JSON.stringify(args)
  const str_fn = fn.toString().replace(/\n/g, '')
  return `${str_args}:${str_fn}`
}

export function useSuspense<
  F extends SuspenseCacheResolver,
  Deps extends Parameters<F>,
  R extends Awaited<ReturnType<F>>
>(
  fn: F,
  deps: Deps,
  resolveKey: string | ((args: Deps, fn: F) => string) = defaultResolveKey
): R {
  const cache = (useCacheContext() ?? getDefaultCache()) as Cache<
    R,
    Error,
    [F, ...Deps]
  >

  const refFn = useRef(fn)
  refFn.current = fn

  const refValue = useRef<R>()

  const key = useMemo(
    () =>
      typeof resolveKey === 'string'
        ? resolveKey
        : resolveKey(deps, refFn.current),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  )
  const refKey = useRef<string>()
  const prevKey = refKey.current
  refKey.current = key

  const state = cache.read(key)

  if (state === undefined) {
    console.log('no state available')
    // Initial key value is undefined, so equality is only possible on a successive update
    if (prevKey !== key) {
      console.log('initiate load')
      throw cache.load(key, fn, ...deps)
    } else {
      console.log("key didn't change", key, prevKey)
      return refValue.current as NonNullable<typeof refValue.current>
    }
  }

  switch (state.status) {
    case 'error':
      throw state.error
    case 'success': {
      refValue.current = state.value
      return refValue.current
    }
    default:
      // Should never get there.
      // 'loading' is handled by Suspense
      // 'canceled' never happens – as we don't expose `cancel` method from `useCache`
      throw new Error(`Got unexpected cache status: ${state.status}`)
  }
}
