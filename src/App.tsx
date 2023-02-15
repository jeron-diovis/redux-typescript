import { Cache, createCache } from '@react-hook/cache'
import {
  FC,
  Suspense,
  SuspenseProps,
  createContext,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import { ErrorBoundary, ErrorBoundaryProps } from 'react-app-error-boundary'

import styles from './App.module.css'

type FN = (...args: any[]) => Promise<unknown>

let defaultCacheSize: number
let defaultCache: ICache

interface ICache<Value = unknown> {
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

  load<F extends FN>(key: string, fn: F, ...args: Parameters<F>): Promise<Value>
}

type CacheFactory<Value = unknown> = () => ICache<Value>

const defaultCacheFactory: CacheFactory = () =>
  createCache(
    <F extends FN>(key: string, fn: F, ...args: Parameters<F>) => fn(...args),
    defaultCacheSize
  ) as ICache

export function setDefaultCacheSize(x: number) {
  defaultCacheSize = x
}

function getDefaultCache() {
  if (defaultCache === undefined) {
    defaultCache = defaultCacheFactory()
  }
  return defaultCache
}

export const CacheContext = createContext<ICache | undefined>(undefined)

setDefaultCacheSize(2) // demo

function defaultResolveKey(args: unknown[], fn: () => void) {
  const str_args = args.length === 0 ? '' : JSON.stringify(args)
  const str_fn = fn.toString().replace(/\n/g, '')
  return `${str_args}:${str_fn}`
}

function useSuspense<
  F extends FN,
  Deps extends Parameters<F>,
  R extends Awaited<ReturnType<F>>
>(
  fn: F,
  deps: Deps,
  resolveKey: string | ((args: Deps, fn: F) => string) = defaultResolveKey
): R {
  const cache = (useContext(CacheContext) ?? getDefaultCache()) as Cache<
    R,
    Error,
    [F, ...Deps]
  >

  const refFn = useRef(fn)
  refFn.current = fn

  const refValue = useRef<R>()

  const key = useMemo(
    () =>
      typeof resolveKey === 'string'
        ? resolveKey
        : resolveKey(deps, refFn.current),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  )
  const refKey = useRef<string>()
  const prevKey = refKey.current
  refKey.current = key

  const state = cache.read(key)

  if (state === undefined) {
    console.log('no state available')
    // Initial key value is undefined, so equality is only possible on a successive update
    if (prevKey !== key) {
      console.log('initiate load')
      throw cache.load(key, fn, ...deps)
    } else {
      console.log("key didn't change", key, prevKey)
      return refValue.current as NonNullable<typeof refValue.current>
    }
  }

  switch (state.status) {
    case 'error':
      throw state.error
    case 'success': {
      refValue.current = state.value
      return refValue.current
    }
    default:
      // Should never get there.
      // 'loading' is handled by Suspense
      // 'canceled' never happens – as we don't expose `cancel` method from `useCache`
      throw new Error(`Got unexpected cache status: ${state.status}`)
  }
}

const Guard: FC<SuspenseProps & ErrorBoundaryProps> = ({
  children,
  fallback = '...loading...',
  ...errorBoundaryProps
}) => (
  <ErrorBoundary {...errorBoundaryProps}>
    <Suspense {...{ children, fallback }} />
  </ErrorBoundary>
)

function App() {
  const [, forceRender] = useReducer(x => x + 1, 0)
  return (
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
