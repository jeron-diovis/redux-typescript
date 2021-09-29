import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { GuestRoute } from './components'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import routes from './routes'

export default function AppRouter() {
  return (
    <Switch>
      <Route path={routes.home} component={Home} exact />
      <Route path={routes.about} component={About} />
      <GuestRoute path={routes.login} component={Login} />
    </Switch>
  )
}
