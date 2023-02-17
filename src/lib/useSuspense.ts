import {
  Context,
  useCallback,
  useContext,
  useDebugValue,
  useMemo,
  useRef,
} from 'react'
import { useErrorHandler } from 'react-app-error-boundary'

import hashSum from 'hash-sum'

import {
  DefaultSuspenseCacheContext,
  SuspenseCache,
  SuspenseCacheResolver,
} from './cache'
import { getLogger } from './logger'

export type CacheKeyResolver = (
  hash: string,
  args: unknown[],
  fn: () => unknown
) => string

export interface UseSuspenseOptions {
  key?: CacheKeyResolver
  context?: Context<SuspenseCache>
  debug?: boolean | string
  watchFuncChanges?: boolean
}

/**
 * Just to identify whether current value has been loaded or taken from cache.
 * For logging purposes only.
 * Don't use null/undefined, because loader func can return those too.
 */
const EMPTY = Symbol('@@use-suspense/empty')

export function useSuspenseHandle<Func extends SuspenseCacheResolver>(
  fn: Func,
  deps: Parameters<Func>,
  opts: UseSuspenseOptions = {}
): [Awaited<ReturnType<Func>>, () => void] {
  type Value = Awaited<ReturnType<Func>>

  const { context = DefaultSuspenseCacheContext, debug = false } = opts

  const [key, prevKey] = useCacheKey(deps, fn, opts)
  const cache = useContext(context) as SuspenseCache<Value>
  const state = cache.read(key)

  const debugLabel = typeof debug === 'string' ? debug : fn.name || 'anonymous'
  const logger = getLogger(debug !== false, debugLabel, key, prevKey, fn, deps)
  useDebugValue(debugLabel)

  /**
   * Cache can get overflown by amount of loads on one screen / in one component.
   * Which will cause an infinite loop, when latest calls remove cache for earliest ones, and it starts all over.
   * To prevent this, backup loaded value here, aside from cache.
   * If state in cache is lost, but cache key didn't change – this backup will be used,
   * instead of initiating a load again.
   */
  const refValue = useRef<Value | typeof EMPTY>(EMPTY)

  const [load, handle] = useLoaderCallbacks((isForced = false) => {
    logger.loading(isForced)
    refValue.current = EMPTY
    return cache.load(key, fn, ...deps)
  })

  if (state === undefined) {
    // Initial key value is `undefined`,
    // so equality is only possible on a successive update.
    if (prevKey === key) {
      logger.overflow(refValue.current)
      return [refValue.current as Value, handle]
    } else {
      throw load()
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
      logger.success(value, refValue.current !== EMPTY)
      refValue.current = value
      return [value, handle]
    }

    default:
      // Should never get there.
      throw new Error(`Got unexpected cache status: ${status}`)
  }
}

export function useSuspense<Func extends SuspenseCacheResolver>(
  fn: Func,
  deps: Parameters<Func>,
  opts: UseSuspenseOptions = {}
) {
  const [value] = useSuspenseHandle(fn, deps, opts)
  return value as Awaited<ReturnType<Func>>
}

// ---

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

function useLoaderCallbacks<F extends (isForced?: boolean) => Promise<unknown>>(
  fn: F
): [F, () => void] {
  const err = useErrorHandler()
  const ref = useRef(fn)
  ref.current = fn

  // stable callback to be exposed to user
  const handle = useCallback(
    () => err(ref.current(true).then(() => err(null))),
    [err]
  )

  return [fn, handle]
}
