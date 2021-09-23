import { getRouter } from 'connected-react-router'
import { useSelector } from 'react-redux'

import { useDispatch, useOnChange } from 'src/hooks'

import { HistoryReferrerSlice } from './slice'

export default function ReferrerTracker() {
  const dispatch = useDispatch()
  const {
    action,
    location: { key, query, ...loc },
  } = useSelector(getRouter)

  useOnChange(
    loc,
    (next, prev) => {
      if (action !== 'REPLACE') {
        dispatch(HistoryReferrerSlice.actions.setReferrer(prev))
      }
    },
    { onMount: true }
  )

  return null
}
