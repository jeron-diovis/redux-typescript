import { goBack, push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { matchPath } from 'react-router'

import Button, { IButtonProps } from 'src/components/Button'

import { selectReferrer } from './slice'

interface IGoBackButtonProps extends Omit<IButtonProps, 'onClick' | 'type'> {
  expect?: string
}

export default function GoBackButton(props: IGoBackButtonProps) {
  const { expect, children, ...rest } = props
  const referrer = useSelector(selectReferrer)
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
