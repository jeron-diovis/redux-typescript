import { useDebugValue, useMemo, useRef } from 'react'

import {
  SuspenseCache,
  SuspenseCacheResolver,
  getDefaultCache,
  useSuspenseCacheContext,
} from './cache'
import { getLogger } from './logger'

// TODO: any better ideas for hashing?
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
  const { key: keygen = defaultKeyResolver, debug = false } = opts

  const cache = (useSuspenseCacheContext() ??
    getDefaultCache()) as SuspenseCache<R>

  const refFn = useRef(fn)
  refFn.current = fn

  const key = useMemo(
    () => (typeof keygen === 'string' ? keygen : keygen(deps, refFn.current)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  )
  const refKey = useRef<string>()
  const prevKey = refKey.current
  refKey.current = key

  const refValue = useRef<R>()

  const state = cache.read(key)

  useDebugValue(fn.name || '(anonymous function)')
  const logger = getLogger(debug, key, fn, deps)

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
