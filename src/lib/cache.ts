import { createCache } from '@react-hook/cache'
import {
  Context,
  FC,
  PropsWithChildren,
  createContext,
  createElement,
  useRef,
} from 'react'

export type SuspenseCacheResolver<V = unknown> = (...args: any[]) => Promise<V>

export type SuspenseCacheState<V = unknown> =
  | undefined
  | {
      status: 'loading'
      value: Promise<V>
    }
  | {
      status: 'success'
      value: V
    }
  | {
      status: 'error'
      error: Error
    }

export interface SuspenseCache<V = unknown> {
  read(key: string): SuspenseCacheState<V>

  load<F extends SuspenseCacheResolver>(
    key: string,
    fn: F,
    ...args: Parameters<F>
  ): Promise<V>
}

export const createDefaultCache = (size?: number): SuspenseCache => {
  const cache = createCache((key, fn, ...args) => fn(...args), size)

  const { load } = cache
  cache.load = (...args) => {
    const [key] = args
    const promise = load(...args)
    const state = cache.read(key)
    if (state?.status === 'loading') {
      state.value = promise
    }
    return promise
  }

  return cache as SuspenseCache
}

export const createCacheContext = (
  cache: SuspenseCache = createDefaultCache()
): Context<SuspenseCache> => createContext(cache)

export const DefaultSuspenseCacheContext = createCacheContext()

export const SuspenseCacheProvider: FC<
  PropsWithChildren<{ cache: SuspenseCache } | { cacheSize: number }>
> = ({ children, ...rest }) => {
  const refDefaultCache = useRef<SuspenseCache>()
  const refSize = useRef<number>()

  let cache: SuspenseCache
  if ('cache' in rest) {
    cache = rest.cache
  } else {
    const { cacheSize } = rest
    if (refSize.current !== cacheSize) {
      refSize.current = cacheSize
      refDefaultCache.current = createDefaultCache(cacheSize)
    }
    cache = refDefaultCache.current as SuspenseCache
  }

  return createElement(
    DefaultSuspenseCacheContext.Provider,
    { value: cache },
    children
  )
}
