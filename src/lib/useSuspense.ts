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

export type CacheKeyResolver = (params: {
  args: unknown[]
  fn: () => unknown
  resource?: string
}) => string

export interface UseSuspenseOptions {
  resource?: string
  key?: CacheKeyResolver
  context?: Context<SuspenseCache>
  debug?: boolean | string
  watchFunc?: boolean
}

/**
 * Just to identify whether current value has been loaded or taken from cache.
 * For logging purposes only.
 * Don't use null/undefined, because loader func can return those too.
 */
const EMPTY = Symbol('@@use-suspense/empty')

/**
 * @see https://stackoverflow.com/a/75464593/3437433
 */
type NonEmptyTuple = [unknown, ...unknown[]]
type UseSuspenseArgs<A> =
  | [xs: A & NonEmptyTuple]
  | [xs: A & NonEmptyTuple, opts: UseSuspenseOptions]
  | ([] extends A ? [] | [opts: UseSuspenseOptions] : never)

export function useSuspenseHandle<F extends SuspenseCacheResolver>(
  fn: F,
  ...rest: UseSuspenseArgs<Parameters<F>>
): [Awaited<ReturnType<F>>, () => void] {
  type Value = Awaited<ReturnType<F>>

  const [deps, opts] = resolveParams(fn, ...rest)
  const { context = DefaultSuspenseCacheContext, debug = false } = opts

  const [key, prevKey] = useCacheKey(deps, fn, opts)
  const cache = useContext(context) as SuspenseCache<Value>
  const state = cache.read(key)

  const debugLabel = formatDebugLabel(fn.name, opts)
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
    logger.load(isForced)
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

    case 'loading': {
      logger.loading()
      throw state.value
    }

    case 'success': {
      const { value } = state
      logger.success(value, refValue.current === EMPTY)
      refValue.current = value
      return [value, handle]
    }

    default:
      // Should never get there.
      throw new Error(`Got unexpected cache status: ${status}`)
  }
}

export function useSuspense<F extends SuspenseCacheResolver>(
  fn: F,
  ...rest: UseSuspenseArgs<Parameters<F>>
) {
  const [value] = useSuspenseHandle(fn, ...rest)
  return value
}

// ---

function resolveParams<F extends SuspenseCacheResolver>(
  fn: F,
  ...rest: UseSuspenseArgs<Parameters<F>>
): [Parameters<F>, UseSuspenseOptions] {
  const no_deps = [] as unknown as Parameters<F>
  switch (rest.length) {
    case 0:
      return [no_deps, {}]

    case 1:
      return fn.length === 0
        ? [no_deps, rest[0] as UseSuspenseOptions]
        : [rest[0] as Parameters<F>, {}]

    case 2:
      return rest
  }
}

function useCacheKey(
  args: unknown[],
  fn: () => unknown,
  opts: UseSuspenseOptions
): [string, string | undefined] {
  const { resource, key: keygen, watchFunc = false } = opts

  const key = useMemo(
    () =>
      keygen?.({ args, fn, resource }) ?? hashSum([...args, resource ?? fn]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...args, resource, watchFunc ? fn : undefined]
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
  const handle = useCallback(async () => {
    const promise = ref.current(true)
    err(promise)
    await promise
    err(null)
  }, [err])

  return [fn, handle]
}

function formatDebugLabel(
  fnName: string,
  opts: Pick<UseSuspenseOptions, 'debug' | 'resource'>
): string {
  const { debug, resource } = opts
  const label = resource ? `{${resource}}` : `${fnName || 'anonymous'}`
  if (typeof debug === 'string') {
    return `${label} | ${debug}`
  } else {
    return label
  }
}
