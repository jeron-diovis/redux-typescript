import { ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectIsAuthorized } from '../selectors'
import { loadUser } from '../thunks'

let checked = false // probably don't need to put this in store?

function useLoadUser() {
  const dispatch = useDispatch<AppDispatch>()
  const isAuthorized = useSelector(selectIsAuthorized)
  if (!isAuthorized) {
    if (!checked) {
      checked = true
      throw (
        dispatch(loadUser())
          // swallow error
          // if can't load user, you're not authenticated yet, and that's all
          .catch(() => {})
      )
    }
  }
}

export default function SessionChecker(props: { children: ReactNode }) {
  const { children } = props
  useLoadUser()
  return <>{children}</>
}
