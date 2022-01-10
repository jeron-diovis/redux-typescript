import routes from 'src/routes'

import { ReferrerState } from '../HistoryReferrer'

import { IUser } from './types'

// ---

// where to go after login
export function resolveAuthReferrerPath(
  { ref, force }: ReferrerState,
  user: IUser
): string {
  if (ref && force) {
    return ref.pathname
  }

  return getUserHomePage(user)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getUserHomePage(user: IUser) {
  return routes.home
}
