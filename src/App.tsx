import { FC, Suspense, SuspenseProps, useReducer, useState } from 'react'
import { ErrorBoundary, ErrorBoundaryProps } from 'react-app-error-boundary'

import { setDefaultCacheSize, useSuspense } from './lib'

import styles from './App.module.css'

setDefaultCacheSize(2) // demo

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

export default App
