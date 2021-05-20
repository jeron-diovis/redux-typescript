import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { About } from './pages/About'
import { Home } from './pages/Home'
import routes, { history } from './routes'

const App: React.FC = () => {
  return (
    <ConnectedRouter history={history}>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path={routes.home} component={Home} exact />
          <Route path={routes.about} component={About} />
        </Switch>
      </div>
    </ConnectedRouter>
  )
}

export default App
