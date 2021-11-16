import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Home } from './pages/Home'
import routes from './routes'

export default function AppRouter() {
  return (
    <Switch>
      <Route path={routes.home} component={Home} exact />
    </Switch>
  )
}
