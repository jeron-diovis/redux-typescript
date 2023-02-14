import { Cache, createCache } from '@react-hook/cache'
import {
  FC,
  PropsWithChildren,
  Suspense,
  SuspenseProps,
  createContext,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import {
  ErrorBoundary,
  setDefaultErrorBoundaryOptions,
} from 'react-app-error-boundary'

import styles from './App.module.css'

setDefaultErrorBoundaryOptions({ logCaughtErrors: false })

type FN = (...args: any[]) => Promise<unknown>

const cache = createCache(
  <F extends FN>(key: string, fn: F, ...args: Parameters<F>) => fn(...args),
  2
)

const CacheContext = createContext(cache)

const CacheProvider: FC<PropsWithChildren> = ({ children }) => (
  <CacheContext.Provider value={cache}>{children}</CacheContext.Provider>
)

const useCacheContext = () => useContext(CacheContext)

function defaultResolveKey(args: unknown[]) {
  return JSON.stringify(args)
}

function useSuspense<
  F extends FN,
  Deps extends Parameters<F>,
  R extends Awaited<ReturnType<F>>
>(
  fn: F,
  deps: Deps,
  resolveKey: string | ((args: Deps) => string) = defaultResolveKey
): R {
  const cache = useCacheContext() as Cache<R, Error, [F, ...Deps]>
  const refFn = useRef(fn)
  refFn.current = fn

  const refResolved = useRef(false)
  const refValue = useRef<R>()

  const key = useMemo(
    () =>
      `${refFn.current.toString()}\n${
        typeof resolveKey === 'string' ? resolveKey : resolveKey(deps)
      }`,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  )
  const refKey = useRef<string>()
  const prevKey = refKey.current
  refKey.current = key

  const state = cache.read(key)

  if (state === undefined) {
    console.log('no state available')
    if (prevKey === key && refResolved.current) {
      console.log("key didn't change and suspense is resolved", key, prevKey)
      return refValue.current as NonNullable<typeof refValue.current>
    } else {
      console.log('initiate load')
      refResolved.current = false
      refValue.current = undefined
      throw cache.load(key, fn, ...deps)
    }
  }

  if (state.status === 'error') {
    throw state.error
  }

  if (state.status === 'success') {
    refResolved.current = true
    refValue.current = state.value
    return refValue.current
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
  const [, forceRender] = useReducer(x => x + 1, 0)
  return (
    <CacheProvider>
      <div className={styles.app}>
        <button onClick={forceRender}>force update</button>
        <Guard>
          <ExampleSimplest />
        </Guard>
        <Guard>
          <ExampleExternal />
        </Guard>
        <Guard>
          <ExampleUpdateDeps />
        </Guard>
        <Guard>
          <ExampleError />
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

async function fetchTodo(id: string | number): Promise<ITodo> {
  const r = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
  return r.json()
}

function ExampleSimplest() {
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

function ExampleExternal() {
  const value = useSuspense(fetchTodo, [2])
  return (
    <div>
      #{value.id}: {value.title}
    </div>
  )
}

function ExampleUpdateDeps() {
  const [id, setId] = useState(3)
  const value = useSuspense(fetchTodo, [id])
  return (
    <div>
      <button onClick={() => setId(x => x + 1)}>inc id</button>
      <div>#{value.id}: </div>
      {value.title}
    </div>
  )
}

function ExampleError() {
  useSuspense(() => fetch('http://unexisting-route'), [])
  return <div>you won't see this</div>
}

export default App
