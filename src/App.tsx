import { Cache, createCache } from '@react-hook/cache'
import {
  FC,
  PropsWithChildren,
  Suspense,
  SuspenseProps,
  createContext,
  useContext,
  useMemo,
  useRef,
} from 'react'
import { ErrorBoundary } from 'react-app-error-boundary'

import styles from './App.module.css'

type FN = (...args: unknown[]) => Promise<unknown>

const cache = createCache(
  <F extends FN>(key: string, fn: F, ...args: Parameters<F>) => fn(...args),
  2
)

const CacheContext = createContext(cache)

const CacheProvider: FC<PropsWithChildren> = ({ children }) => (
  <CacheContext.Provider value={cache}>{children}</CacheContext.Provider>
)

const useCacheContext = () => useContext(CacheContext)

function defaultResolveKey(...args: unknown[]) {
  return JSON.stringify(args)
}

function useSuspense<
  F extends FN,
  Deps extends Parameters<F>,
  R extends Awaited<ReturnType<F>>
>(
  fn: F,
  deps: Deps,
  resolveKey: (args: Deps) => string = defaultResolveKey
): R {
  const cache = useCacheContext() as Cache<R, Error, [F, ...Deps]>
  const refFn = useRef(fn)
  refFn.current = fn

  const refResolved = useRef(false)
  const refValue = useRef<R>()

  const key = useMemo(
    () => `${refFn.current.toString()}:${resolveKey(deps)}`,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  )
  const refKey = useRef<string>()
  const prevKey = refKey.current
  refKey.current = key

  const state = cache.read(key)

  if (state === undefined) {
    if (prevKey === key && refResolved.current) {
      return refValue.current as NonNullable<typeof refValue.current>
    } else {
      refResolved.current = false
      refValue.current = undefined
      throw cache.load(key, fn, ...deps)
    }
  }

  if (state.status === 'error') {
    throw state.error
  }

  if (state.status === 'success') {
    refValue.current = state.value
    refResolved.current = true
    return state.value
  }

  // 'loading' status never happens here – it's handled by parent Suspense component
  // 'canceled' status never happens here – as we don't call `useCache` which provides `cancel` method
  // should never get there
  throw new Error(`Got unexpected cache status: ${state.status}`)
}

const Guard: FC<SuspenseProps> = ({ children, fallback = '...loading...' }) => (
  <ErrorBoundary>
    <Suspense {...{ children, fallback }} />
  </ErrorBoundary>
)

function App() {
  return (
    <CacheProvider>
      <div className={styles.app}>
        <Guard>
          <Example1 />
        </Guard>
      </div>
    </CacheProvider>
  )
}

type ITodo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

function Example1() {
  const value = useSuspense(
    () =>
      fetch('https://jsonplaceholder.typicode.com/todos/1').then(r =>
        r.json()
      ) as Promise<ITodo>,
    []
  )
  return (
    <div>
      #{value.id}: {value.title}
    </div>
  )
}

export default App
