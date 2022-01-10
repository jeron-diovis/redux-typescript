import { Location, LocationDescriptorObject } from 'history'

import routes from 'src/routes'

type NoKey<T> = Omit<T, 'key'>

export type ReferrerLocation =
  | (NoKey<LocationDescriptorObject> & { pathname: string })
  | null

export type ReferrerState = {
  ref: ReferrerLocation
  force: boolean
}

// ---

const REFERRER_LOCATION_STATE_NAME = 'returnTo'

type AuthRedirectLocation = NoKey<Location> | Location['pathname']
type ReferrerLocationState = {
  [REFERRER_LOCATION_STATE_NAME]: AuthRedirectLocation
}

export function createAuthRedirectLocation(returnTo?: AuthRedirectLocation) {
  return {
    pathname: routes.login,
    state: {
      [REFERRER_LOCATION_STATE_NAME]: returnTo,
    },
  }
}

export function getLocationReferrer(
  loc?: Location
): ReferrerLocation | undefined {
  if (!loc?.state) return undefined

  const ref = (loc.state as ReferrerLocationState)[REFERRER_LOCATION_STATE_NAME]

  if (typeof ref === 'string') {
    return { pathname: ref }
  }

  return ref
}
