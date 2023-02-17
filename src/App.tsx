import { FC, Suspense, SuspenseProps, useReducer, useState } from 'react'
import { ErrorBoundary, ErrorBoundaryProps } from 'react-app-error-boundary'

import { SuspenseCacheProvider, useSuspense } from './lib'

import styles from './App.module.css'

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
    <div className={styles.app} style={{ display: 'grid', gap: '1rem' }}>
      <button onClick={forceRender}>force update</button>
      <SuspenseCacheProvider cacheSize={2}>
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
        <Guard>
          <ExampleUpdateFunc />
        </Guard>
      </SuspenseCacheProvider>
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
      <div>
        #{value.id}: {value.title}
      </div>
      <button onClick={() => setId(x => x + 1)}>inc id</button>
    </div>
  )
}

function ExampleError() {
  useSuspense(() => fetch('http://unexisting-route'), [])
  return <div>you won't see this</div>
}

async function fetchPost(
  id: string | number
): Promise<Omit<ITodo, 'completed' & { body: string }>> {
  const r = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  return r.json()
}

function ExampleUpdateFunc() {
  const [id, setId] = useState<string | number>(4)
  const [cb, setCb] = useState(() => fetchTodo)
  const [trackCb, setTrackCb] = useState(true)

  const value = useSuspense(cb, [id], {
    debug: 'tracker',
    watchFuncChanges: trackCb,
  })

  return (
    <div style={{ textAlign: 'start' }}>
      <div>
        <label>
          <input
            type="radio"
            name="source"
            value="todo"
            checked={cb === fetchTodo}
            onChange={() => setCb(() => fetchTodo)}
          />
          Todo
        </label>
        <label>
          <input
            type="radio"
            name="source"
            value="post"
            checked={cb === fetchPost}
            onChange={() => setCb(() => fetchPost)}
          />
          Post
        </label>
      </div>

      <label style={{ display: 'block' }}>
        id:
        <input
          type="number"
          value={id}
          min={1}
          onChange={e => setId(e.target.value)}
        />
      </label>

      <label style={{ display: 'block' }}>
        <input
          type="checkbox"
          checked={trackCb}
          onChange={e => setTrackCb(e.target.checked)}
        />
        Track callback changes
      </label>

      <pre>{JSON.stringify(value, null, 4)}</pre>
    </div>
  )
}

export default App
