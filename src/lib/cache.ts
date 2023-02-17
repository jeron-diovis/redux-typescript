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

export interface SuspenseCache<V = unknown> {
  read(key: string):
    | undefined
    | {
        value: V
        status: 'success'
      }
    | {
        error: Error
        status: 'error'
      }

  load<F extends SuspenseCacheResolver>(
    key: string,
    fn: F,
    ...args: Parameters<F>
  ): Promise<V>
}

export const createDefaultCache = (size?: number): SuspenseCache =>
  createCache((key, fn, ...args) => fn(...args), size) as SuspenseCache

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
