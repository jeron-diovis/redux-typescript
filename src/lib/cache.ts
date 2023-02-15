import { createCache } from '@react-hook/cache'
import { createContext, useContext } from 'react'

let defaultCacheSize: number
let defaultCache: ISuspenseCache

export type SuspenseCacheResolver = (...args: any[]) => Promise<unknown>

export interface ISuspenseCache<Value = unknown> {
  read(key: string):
    | undefined
    | {
        value: Value
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
  ): Promise<Value>
}

export function setDefaultCacheSize(x: number) {
  defaultCacheSize = x
}

export function getDefaultCache() {
  if (defaultCache === undefined) {
    defaultCache = createCache(
      <F extends SuspenseCacheResolver>(
        key: string,
        fn: F,
        ...args: Parameters<F>
      ) => fn(...args),
      defaultCacheSize
    ) as ISuspenseCache
  }
  return defaultCache
}

export const CacheContext = createContext<ISuspenseCache | undefined>(undefined)

export const useCacheContext = () => useContext(CacheContext)
