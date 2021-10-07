import { ConnectedRouter } from 'connected-react-router'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import AppRouter from 'src/Router'
import { ErrorComponent, MainLayout } from 'src/components'
import { ReferrerTracker } from 'src/features/HistoryReferrer'
import { SessionChecker } from 'src/features/User'
import { history } from 'src/routes'

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
