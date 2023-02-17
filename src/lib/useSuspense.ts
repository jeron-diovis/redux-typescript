import { useDebugValue, useMemo, useRef } from 'react'

import hashSum from 'hash-sum'

import {
  SuspenseCache,
  SuspenseCacheResolver,
  getDefaultCache,
  useSuspenseCacheContext,
} from './cache'
import { getLogger } from './logger'

export type KeyResolver = (
  hash: string,
  args: unknown[],
  fn: () => unknown
) => string

export interface UseSuspenseOptions {
  debug?: boolean
  key?: KeyResolver
  watchFuncChanges?: boolean
}

export function useSuspense<
  F extends SuspenseCacheResolver,
  Deps extends Parameters<F>,
  R extends Awaited<ReturnType<F>>
>(fn: F, deps: Deps, opts: UseSuspenseOptions = {}): R {
  const { debug = false } = opts

  const cache = (useSuspenseCacheContext() ??
    getDefaultCache()) as SuspenseCache<R>

  const [key, prevKey] = useCacheKey(deps, fn, opts)

  const state = cache.read(key)

  useDebugValue(fn.name || '(anonymous function)')
  const logger = getLogger(debug, key, fn, deps)

  const refValue = useRef<R>()

  if (state === undefined) {
    // Initial key value is `undefined`,
    // so equality is only possible on a successive update.
    if (prevKey === key) {
      logger.reading(refValue.current)
      return refValue.current as R
    } else {
      logger.loading(prevKey)
      throw cache.load(key, fn, ...deps)
    }
  }

  const { status } = state
  switch (status) {
    case 'error': {
      const { error } = state
      logger.error(error)
      throw error
    }

    case 'success': {
      const { value } = state
      logger.success(value)
      refValue.current = value
      return value
    }

    default:
      // Should never get there.
      throw new Error(`Got unexpected cache status: ${status}`)
  }
}

function useCacheKey(
  deps: unknown[],
  fn: () => unknown,
  opts: UseSuspenseOptions
): [string, string | undefined] {
  const { key: keygen, watchFuncChanges = false } = opts

  const key = useMemo(
    () => {
      const hash = hashSum([...deps, fn])
      return keygen?.(hash, deps, fn) ?? hash
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    watchFuncChanges ? [...deps, fn] : deps
  )

  const refPrev = useRef<string>()
  const prev = refPrev.current
  refPrev.current = key

  return [key, prev]
}
