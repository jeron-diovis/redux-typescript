import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { GuestRoute } from 'src/features/User'

import { Home } from './pages/Home'
import { Login } from './pages/Login'
import routes from './routes'

export default function AppRouter() {
  return (
    <Switch>
      <Route path={routes.home} component={Home} exact />
      <GuestRoute path={routes.login} component={Login} />
    </Switch>
  )
}
