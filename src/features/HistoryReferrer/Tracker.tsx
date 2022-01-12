import { getRouter } from 'connected-react-router'
import React from 'react'
import { useSelector } from 'react-redux'

import { useDispatch, useLatest, useOnChange } from 'src/hooks'

import { PrevLocationContext } from './hooks'
import { getLocationReferrer } from './lib'
import { HistoryReferrerSlice, selectReferrer } from './slice'

/* TODO: probably this better be done in middleware? */
export const ReferrerTracker: React.FC = ({ children }) => {
  const dispatch = useDispatch()
  const {
    action,
    location: { key, query, ...loc },
  } = useSelector(getRouter)

  const isFirstLoad = useSelector(selectReferrer).ref === null
  const prev = useLatest(loc)

  useOnChange(
    loc,
    (curr, prev) => {
      const ref = getLocationReferrer(curr)
      const hasForcedRef = ref !== undefined

      if (action === 'REPLACE' && !hasForcedRef) return

      dispatch(
        HistoryReferrerSlice.actions.setReferrer({
          ref: ref ?? prev,
          force: hasForcedRef,
        })
      )
    },
    { onMount: true }
  )

  return (
    <PrevLocationContext.Provider value={isFirstLoad ? null : prev}>
      {children}
    </PrevLocationContext.Provider>
  )
}
