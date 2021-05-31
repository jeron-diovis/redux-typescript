import { ConnectedRouter } from 'connected-react-router'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Switch } from 'react-router-dom'

import { ReferrerTracker } from './features/HistoryReferrer'
import { About } from './pages/About'
import { Home } from './pages/Home'
import routes, { history } from './routes'

const App: React.FC = () => {
  return (
    <Guard>
      <ReferrerTracker />
      <ConnectedRouter history={history}>
        <Switch>
          <Route path={routes.home} component={Home} exact />
          <Route path={routes.about} component={About} />
        </Switch>
      </ConnectedRouter>
    </Guard>
  )
}

const Guard: React.FC = props => {
  const { children } = props
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <div style={{ color: 'red' }}>
          {typeof error === 'string' ? error : error.message}
        </div>
      )}
    >
      <Suspense fallback="...loading...">{children}</Suspense>
    </ErrorBoundary>
  )
}

export default App
