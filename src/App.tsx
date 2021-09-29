import { ConnectedRouter } from 'connected-react-router'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import AppRouter from './Router'
import { ErrorComponent, Main as MainLayout } from './components'
import { ReferrerTracker } from './features/HistoryReferrer'
import { SessionChecker } from './features/User'
import { history } from './routes'

const App: React.FC = () => {
  return (
    <Guard>
      <SessionChecker>
        <ConnectedRouter history={history}>
          <ReferrerTracker />
          <MainLayout>
            <AppRouter />
          </MainLayout>
        </ConnectedRouter>
      </SessionChecker>
    </Guard>
  )
}

const Guard: React.FC = props => {
  const { children } = props
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <ErrorComponent>
          {typeof error === 'string' ? error : error.message}
        </ErrorComponent>
      )}
    >
      <Suspense fallback="...loading...">{children}</Suspense>
    </ErrorBoundary>
  )
}

export default App
