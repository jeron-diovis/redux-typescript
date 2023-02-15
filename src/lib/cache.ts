import { createCache } from '@react-hook/cache'
import { createContext, useContext } from 'react'

export type SuspenseCacheResolver = (...args: any[]) => Promise<unknown>

export interface SuspenseCache<Value = unknown> {
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

let defaultCacheSize: number
let defaultCache: SuspenseCache

export function setDefaultCacheSize(x: number) {
  if (defaultCacheSize === undefined) {
    defaultCacheSize = x
  }
}

export function getDefaultCache() {
  if (defaultCache === undefined) {
    defaultCache = createCache(
      (key, fn, ...args) => fn(...args),
      defaultCacheSize
    ) as SuspenseCache
  }
  return defaultCache
}

export const SuspenseCacheContext = createContext<SuspenseCache | undefined>(
  undefined
)

export const useSuspenseCacheContext = () => useContext(SuspenseCacheContext)
