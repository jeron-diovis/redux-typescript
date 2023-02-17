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
  Func extends SuspenseCacheResolver,
  Deps extends Parameters<Func>,
  Value extends Awaited<ReturnType<Func>>
>(fn: Func, deps: Deps, opts: UseSuspenseOptions = {}): Value {
  const { context = DefaultSuspenseCacheContext, debug = false } = opts

  const cache = useContext(context) as SuspenseCache<Value>
  const [key, prevKey] = useCacheKey(deps, fn, opts)
  const state = cache.read(key)

  const debugLabel = typeof debug === 'string' ? debug : fn.name || 'anonymous'
  useDebugValue(debugLabel)
  const logger = getLogger(debug !== false, debugLabel, key, prevKey, fn, deps)

  /**
   * Cache can get overflown by amount of loads on one screen / in one component.
   * Which will cause an infinite loop, when latest calls remove cache for earliest ones, and it starts all over.
   * To prevent this, backup loaded value here, aside from cache.
   * If state in cache is lost, but cache key didn't change – this backup will be used,
   * instead of initiating a load again.
   */
  const refValue = useRef<Value>()

  if (state === undefined) {
    // Initial key value is `undefined`,
    // so equality is only possible on a successive update.
    if (prevKey === key) {
      logger.reading(refValue.current)
      return refValue.current as Value
    } else {
      logger.loading()
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
