import { useSelector } from 'react-redux'
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom'

import routes from 'src/routes'

import { createAuthRedirectLocation } from '../../HistoryReferrer'
import { IUseRoleAccessOptions, useRoleAccess } from '../hooks'
import { selectIsGuest } from '../selectors'

interface RoleRouteOptions {
  roles?: IUseRoleAccessOptions['roles']
  rolesAccess?: IUseRoleAccessOptions['access']
  rolesMatch?: IUseRoleAccessOptions['match']
}

// ---

interface AuthRouteProps extends RouteProps, RoleRouteOptions {}

export const AuthRoute = (props: AuthRouteProps) => {
  const { roles, rolesAccess, rolesMatch, ...rest } = props

  const isGuest = useSelector(selectIsGuest)

  if (isGuest) {
    return <AuthRedirect />
  }

  if (roles === undefined) {
    return <Route {...rest} />
  }

  return <RoleRoute {...(props as RoleRouteProps)} />
}

// ---

interface RoleRouteProps extends AuthRouteProps {
  roles: NonNullable<AuthRouteProps['roles']>
}

const RoleRoute = (props: RoleRouteProps) => {
  const { roles, rolesAccess: access, rolesMatch: match, ...rest } = props
  const isAccessAllowed = useRoleAccess({ roles, access, match })
  const isGuest = useSelector(selectIsGuest)

  if (isAccessAllowed) {
    return <Route {...rest} />
  }

  if (isGuest) {
    return <AuthRedirect />
  }

  // If we're authorized, but still have no access to page –
  // there is nothing more we can do. Just redirect to home page.
  return <Redirect to={routes.home} />
}

// ---

function AuthRedirect() {
  const loc = useLocation()
  return <Redirect to={createAuthRedirectLocation(loc)} />
}
