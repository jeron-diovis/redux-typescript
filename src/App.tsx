import React from 'react'
import { Router } from 'react-router-dom'

import AppRouter from 'src/Router'
import { ErrorBoundary, Loader, MainLayout, Suspense } from 'src/components'
import { history } from 'src/routes'

const App: React.FC = () => {
  return (
    <Guard>
      <Router history={history}>
        <MainLayout>
          <AppRouter />
        </MainLayout>
      </Router>
    </Guard>
  )
}

const Guard: React.FC = props => {
  const { children } = props
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader width="10%" center />}>{children}</Suspense>
    </ErrorBoundary>
  )
}

export default App
