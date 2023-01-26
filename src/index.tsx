import React from 'react'
import { setupReactAppOverlayErrorHandler } from 'react-app-error-boundary'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'
import { Modal } from './components'
import * as serviceWorker from './serviceWorker'
import { store } from './store'

import './index.scss'

setupReactAppOverlayErrorHandler()

const $root = document.getElementById('root') as HTMLElement

Modal.setAppElement($root)

createRoot($root).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
