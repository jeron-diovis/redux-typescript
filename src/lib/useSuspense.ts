import { Context, useContext, useDebugValue, useMemo, useRef } from 'react'

import hashSum from 'hash-sum'

import {
  DefaultSuspenseCacheContext,
  SuspenseCache,
  SuspenseCacheResolver,
} from './cache'
import { getLogger } from './logger'

export type KeyResolver = (
  hash: string,
  args: unknown[],
  fn: () => unknown
) => string

export interface UseSuspenseOptions {
  key?: KeyResolver
  context?: Context<SuspenseCache>
  debug?: boolean | string
  watchFuncChanges?: boolean
}

export function useSuspense<
  F extends SuspenseCacheResolver,
  Deps extends Parameters<F>,
  R extends Awaited<ReturnType<F>>
>(fn: F, deps: Deps, opts: UseSuspenseOptions = {}): R {
  const { context = DefaultSuspenseCacheContext, debug = false } = opts

  const cache = useContext(context) as SuspenseCache<R>

  const [key, prevKey] = useCacheKey(deps, fn, opts)

  const state = cache.read(key)

  const debugLabel = typeof debug === 'string' ? debug : fn.name || 'anonymous'
  useDebugValue(debugLabel)
  const logger = getLogger(debug !== false, debugLabel, key, fn, deps)

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
