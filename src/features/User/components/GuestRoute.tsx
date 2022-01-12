import { useSelector } from 'react-redux'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import { usePrevLocation } from '../../HistoryReferrer'
import { useUserHomepage } from '../hooks'
import { selectIsAuthorized } from '../selectors'

export function GuestRoute(props: RouteProps) {
  const isAuthorized = useSelector(selectIsAuthorized)
  const prev = usePrevLocation()
  const home = useUserHomepage()
  if (isAuthorized) {
    return <Redirect to={prev ?? home} />
  } else {
    return <Route {...props} />
  }
}
