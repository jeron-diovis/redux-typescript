import { createCache } from '@react-hook/cache'
import {
  Context,
  FC,
  PropsWithChildren,
  createContext,
  createElement,
} from 'react'

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

export const createDefaultCache = (size?: number): SuspenseCache =>
  createCache((key, fn, ...args) => fn(...args), size) as SuspenseCache

export const createCacheContext = (
  cache: SuspenseCache = createDefaultCache()
): Context<SuspenseCache> => createContext(cache)

export const DefaultSuspenseCacheContext = createCacheContext()

export const SuspenseCacheProvider: FC<
  PropsWithChildren<{ cache: SuspenseCache } | { cacheSize: number }>
> = ({ children, ...rest }) =>
  createElement(
    DefaultSuspenseCacheContext.Provider,
    {
      value: 'cache' in rest ? rest.cache : createDefaultCache(rest.cacheSize),
    },
    children
  )
