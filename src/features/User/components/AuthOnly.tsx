import { ReactChild, ReactFragment } from 'react'
import { useSelector } from 'react-redux'

import { IUseRoleAccessOptions, useRoleAccess, useUser } from '../hooks'
import { selectIsGuest } from '../selectors'
import { IUser, UserRole } from '../types'

interface UserRendererProps {
  children: ReactChild | ReactFragment | ((user: IUser) => ReactChild)
}

interface AuthOnlyProps
  extends UserRendererProps,
    Partial<IUseRoleAccessOptions> {}

export const AuthOnly = (props: AuthOnlyProps) => {
  const { roles, children } = props

  const isGuest = useSelector(selectIsGuest)

  if (isGuest) {
    return null
  }

  if (roles === undefined) {
    return <Renderer>{children}</Renderer>
  }

  return <RoleOnly {...(props as RoleOnlyProps)} />
}

// ---

interface RoleOnlyProps extends AuthOnlyProps {
  roles: UserRole[]
}

const RoleOnly = (props: RoleOnlyProps) => {
  const { children, ...options } = props

  const isAccessAllowed = useRoleAccess(options)
  if (isAccessAllowed) {
    return <Renderer>{children}</Renderer>
  }

  return null
}

const Renderer = ({ children }: UserRendererProps) => {
  const user = useUser()
  return <>{typeof children === 'function' ? children(user) : children}</>
}
