import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import {
  ErrorBoundary,
  setDefaultErrorBoundaryFallback,
} from 'react-app-error-boundary'

import AppRouter from 'src/Router'
import { ErrorMessage, Loader, SiteLayout, Suspense } from 'src/components'
import { ReferrerTracker } from 'src/features/HistoryReferrer'
import { SessionGuard } from 'src/features/User'
import { history } from 'src/routes'

setDefaultErrorBoundaryFallback(({ error }) => (
  <ErrorMessage>{error.message}</ErrorMessage>
))

const App: React.FC = () => {
  return (
    <Guard>
      <SessionGuard>
        <ConnectedRouter history={history}>
          <ReferrerTracker />
          <SiteLayout>
            <AppRouter />
          </SiteLayout>
        </ConnectedRouter>
      </SessionGuard>
    </Guard>
  )
}

const Guard: React.FC = props => {
  const { children } = props
  return (
    /* for errors at the very top, display error-overlay as normal */
    <ErrorBoundary allowDevErrorOverlay>
      <Suspense fallback={<Loader width="10%" center />}>{children}</Suspense>
    </ErrorBoundary>
  )
}

export default App
