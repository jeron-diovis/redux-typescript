import { useDebugValue, useMemo, useRef } from 'react'

import {
  SuspenseCache,
  SuspenseCacheResolver,
  getDefaultCache,
  useSuspenseCacheContext,
} from './cache'
import { clr, getLogger } from './logger'

export function defaultKeyResolver(args: unknown[], fn: () => void) {
  const str_args = args.length === 0 ? '' : JSON.stringify(args)
  const str_fn = fn.toString()
  return `${str_args}:${str_fn}`
}

export type KeyResolver =
  | string
  | ((args: unknown[], fn: () => unknown) => string)

export interface UseSuspenseOptions {
  debug?: boolean
  key?: KeyResolver
}

export function useSuspense<
  F extends SuspenseCacheResolver,
  Deps extends Parameters<F>,
  R extends Awaited<ReturnType<F>>
>(fn: F, deps: Deps, opts: UseSuspenseOptions = {}): R {
  const { key: resolveKey = defaultKeyResolver, debug = false } = opts

  const cache = (useSuspenseCacheContext() ??
    getDefaultCache()) as SuspenseCache<R>

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

  useDebugValue(fn.name || '(anonymous function)')
  const log = getLogger(debug, key, fn, deps)

  if (state === undefined) {
    const logMsg = 'No state found in cache.'

    // Initial key value is `undefined`, so equality is only possible on a successive update
    if (prevKey !== key) {
      log(
        `${logMsg}\n${
          prevKey === undefined ? '' : 'Key has changed.\n'
        }%cInitiate loading`,
        clr('blue')
      )

      throw cache.load(key, fn, ...deps)
    } else {
      log(
        logMsg +
          "\nKey didn't change – probably cache got overflown.\nReturn the value saved in hook:\n%o",
        refValue.current
      )

      return refValue.current as R
    }
  }

  const { status } = state
  switch (status) {
    case 'error':
      log('%cLoading failed\n%o', clr('red'), state.error)

      throw state.error

    case 'success': {
      log('%cLoading completed\n%o', clr('green'), state.value)

      refValue.current = state.value
      return refValue.current
    }

    default:
      // Should never get there.
      throw new Error(`Got unexpected cache status: ${status}`)
  }
}
