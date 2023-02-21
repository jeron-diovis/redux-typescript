import { FC, Suspense, SuspenseProps, useReducer, useState } from 'react'
import { ErrorBoundary, ErrorBoundaryProps } from 'react-app-error-boundary'

import { SuspenseCacheProvider, useSuspense, useSuspenseHandle } from '../src'

import styles from './App.module.css'

const Guard: FC<SuspenseProps & ErrorBoundaryProps> = ({
  children,
  fallback = '...loading...',
  ...errorBoundaryProps
}) => (
  <ErrorBoundary {...errorBoundaryProps}>
    <Suspense fallback={fallback}>{children}</Suspense>
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
        {/*<Guard>
          <ExampleError />
        </Guard>*/}
        <Guard>
          <ExampleUpdateFunc />
        </Guard>
        <Guard>
          <ExampleHandle />
        </Guard>
        {/*<Guard>
          <ExampleOptional />
        </Guard>*/}
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
      ) as Promise<ITodo>
  )
  return (
    <div>
      #{value.id}: {value.title}
    </div>
  )
}

function ExampleExternal() {
  const value = useSuspense(fetchTodo, [3], {
    resource: 'todo',
  })
  return (
    <div>
      #{value.id}: {value.title}
    </div>
  )
}

function ExampleUpdateDeps() {
  const [id, setId] = useState(3)
  const value = useSuspense(id => fetchTodo(id), [id], {
    resource: 'todo',
  })
  return (
    <div>
      <div>
        #{value.id}: {value.title}
      </div>
      <button onClick={() => setId(x => x + 1)}>inc id</button>
    </div>
  )
}

/*function ExampleError() {
  useSuspense(() => fetch('http://unexisting-route'))
  return <div>you won't see this</div>
}*/

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
    watchFunc: trackCb,
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

function ExampleHandle() {
  const [id, setId] = useState(5)
  const [value, load] = useSuspenseHandle(fetchTodo, [id])
  return (
    <div>
      <div>
        #{value.id}: {value.title}
      </div>
      <button onClick={() => setId(x => x + 1)}>inc id</button>
      <button onClick={load}>refresh</button>
    </div>
  )
}

/*function ExampleOptional() {
  const load = (id: string | number = 5) => fetchTodo(id)
  const value1 = useSuspense(load, { debug: 'optional-noargs' })
  const value2 = useSuspense(load, [6], { debug: 'optional-args' })
  return (
    <div>
      <div>
        #{value1.id}: {value1.title}
      </div>
      <div>
        #{value2.id}: {value2.title}
      </div>
    </div>
  )
}*/

export default App
