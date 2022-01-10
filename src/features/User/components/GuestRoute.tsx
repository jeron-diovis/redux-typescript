import { useSelector } from 'react-redux'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import routes from 'src/routes'

import { usePrevLocation } from '../../HistoryReferrer'
import { selectIsAuthorized } from '../selectors'

export function GuestRoute(props: RouteProps) {
  const isAuthorized = useSelector(selectIsAuthorized)
  const prev = usePrevLocation()
  if (isAuthorized) {
    return <Redirect to={prev ?? routes.home} />
  } else {
    return <Route {...props} />
  }
}
