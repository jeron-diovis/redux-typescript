import { useMemo } from 'react'

import { useChanged } from 'src/hooks'

import { UserRole } from '../types'

import { useUser } from './hooks'

type RolesAccessMode = 'allow' | 'deny'
type RolesMatchMode = 'all' | 'any'

type RoleOrList = UserRole | UserRole[]
type RoleOptions = {
  access?: RolesAccessMode
  match?: RolesMatchMode
}

export interface IUseRoleAccessOptions extends RoleOptions {
  roles: UserRole[]
}

export function useRoleAccess(options: IUseRoleAccessOptions): boolean

export function useRoleAccess(role: RoleOrList, options?: RoleOptions): boolean

export function useRoleAccess(...args: unknown[]): boolean {
  const options = resolveArgs(...args)

  const { roles, access = 'allow', match = 'any' } = options

  const userRoles = useChanged(useUser().roles)
  const changedRoles = useChanged(Array.isArray(roles) ? roles : [roles])

  const isRolesMatch = useMemo(() => {
    const matches = (x: UserRole) => userRoles.includes(x)
    return match === 'all'
      ? changedRoles.every(matches)
      : changedRoles.some(matches)
  }, [changedRoles, userRoles, match])

  const accessAllowed =
    (access === 'allow' && isRolesMatch) || (access === 'deny' && !isRolesMatch)

  return accessAllowed
}

// ---

const resolveRolesList = (x: RoleOrList): UserRole[] =>
  ([] as UserRole[]).concat(x)

function resolveArgs(...args: unknown[]): IUseRoleAccessOptions {
  if (args.length === 2) {
    const [roles, options] = args as [RoleOrList, RoleOptions]
    return {
      roles: resolveRolesList(roles),
      access: options.access,
      match: options.match,
    }
  }

  const [arg] = args as [RoleOrList | IUseRoleAccessOptions]

  if (Array.isArray(arg) || typeof arg === 'string') {
    return {
      roles: resolveRolesList(arg),
    }
  }

  return arg
}
