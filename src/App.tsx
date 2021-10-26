import { ConnectedRouter } from 'connected-react-router'
import React from 'react'

import AppRouter from 'src/Router'
import { ErrorBoundary, Loader, MainLayout, Suspense } from 'src/components'
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
    <ErrorBoundary>
      <Suspense fallback={<Loader width="10%" center />}>{children}</Suspense>
    </ErrorBoundary>
  )
}

export default App
