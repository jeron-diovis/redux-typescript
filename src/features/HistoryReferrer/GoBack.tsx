import { goBack, push } from 'connected-react-router'
import { HTMLAttributes } from 'react'
import { useSelector } from 'react-redux'
import { matchPath } from 'react-router'

import { Button } from 'src/components'
import { useDispatch } from 'src/hooks'

import { selectReferrer } from './slice'

interface IGoBackButtonProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'onClick' | 'type'> {
  expect?: string
}

export function GoBackButton(props: IGoBackButtonProps) {
  const { expect, children, ...rest } = props
  const { ref: referrer } = useSelector(selectReferrer)
  const dispatch = useDispatch()
  return (
    <Button
      {...rest}
      onClick={() => {
        if (expect === undefined || referrer === null) {
          dispatch(goBack())
          return
        }

        const match = matchPath(referrer.pathname, {
          path: expect,
          exact: true,
        })
        if (match !== null) {
          dispatch(push(referrer))
          return
        }

        dispatch(push(expect))
      }}
    >
      &lt;--{children && <> {children}</>}
    </Button>
  )
}
