import clsx from 'clsx'

import Counter from 'src/Counter'

import reactLogo from './assets/react.svg'

import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className={styles.logo} alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            className={clsx(styles.logo, styles.react)}
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className={styles.card}>
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className={styles.read_the_docs}>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
