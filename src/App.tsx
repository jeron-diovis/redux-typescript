import { ConnectedRouter } from 'connected-react-router'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Switch } from 'react-router-dom'

import { ErrorComponent } from './components'
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
