import { ReactChild, ReactFragment } from 'react'
import { useSelector } from 'react-redux'

import { selectIsGuest } from '../selectors'

export const GuestOnly = ({
  children,
}: {
  children: ReactChild | ReactFragment
}) => {
  const isGuest = useSelector(selectIsGuest)
  return <>{isGuest ? children : null}</>
}
