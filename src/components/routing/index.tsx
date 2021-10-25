import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom'

import {
  HistoryReferrerSlice,
  selectReferrer,
} from 'src/features/HistoryReferrer'
import { selectIsAuthorized } from 'src/features/User'
import { useOnMount } from 'src/hooks'
import routes from 'src/routes'

export function AuthRoute(props: RouteProps) {
  const isAuthorized = useSelector(selectIsAuthorized)

  const loc = useLocation()
  const dispatch = useDispatch()
  useOnMount(() => {
    if (!isAuthorized) {
      dispatch(HistoryReferrerSlice.actions.setReferrer(loc))
    }
  })

  if (isAuthorized) {
    return <Route {...props} />
  } else {
    return <Redirect to={routes.login} />
  }
}

export function GuestRoute(props: RouteProps) {
  const isAuthorized = useSelector(selectIsAuthorized)
  const referrer = useSelector(selectReferrer)
  if (isAuthorized) {
    return <Redirect to={referrer ?? '/'} />
  } else {
    return <Route {...props} />
  }
}

export function ExcludeRoute(
  props: Omit<RouteProps, 'path' | 'component' | 'render'> & {
    path: Required<RouteProps>['path']
  }
) {
  const { children } = props
  return (
    <Route {...props}>
      {params => (
        <If condition={!params.match}>
          {typeof children === 'function' ? children(params) : children}
        </If>
      )}
    </Route>
  )
}
