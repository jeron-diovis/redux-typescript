import { createContext, useContext } from 'react'
import { useSelector } from 'react-redux'

import { ReferrerLocation } from './lib'
import { selectReferrer } from './slice'

export const PrevLocationContext = createContext<ReferrerLocation>(null)

/**
 * Keep in mind that referrer *state* is updated at after-render stage.
 * Thus, "referrer" and "prev location" are different terms.
 *
 * "referrer" is applied when user successfully opened a page,
 * after any potential redirects (and omitting REPLACE'd locations).
 *
 * "prev location" is like "live" value – it's exactly previous location,
 * including changes done by redirects, regardless of PUSH/REPLACE actions.
 *
 * For most cases, you want to use referrer.
 * `usePrevLocation` is utility for components like "ProtectedRoute".
 */
export function usePrevLocation() {
  return useContext(PrevLocationContext)
}

export function useReferrer() {
  return useSelector(selectReferrer)
}
