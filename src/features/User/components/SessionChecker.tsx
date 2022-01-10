import React from 'react'
import { useSelector } from 'react-redux'

import { useDispatch } from 'src/hooks'

import { selectIsAuthorized } from '../selectors'
import { loadUser } from '../thunks'

let checked = false // probably don't need to put this in store?

function useLoadUser() {
  const dispatch = useDispatch()
  const isAuthorized = useSelector(selectIsAuthorized)
  if (!isAuthorized) {
    if (!checked) {
      checked = true
      // Due to redux-toolkit logic, error in promise will be swallowed silently
      // Which is what we need: if this request fails, there is no active session available. And that's all.
      throw dispatch(loadUser())
    }
  }
}

export const SessionChecker: React.FC = props => {
  useLoadUser()
  const { children } = props
  return <>{children}</>
}
