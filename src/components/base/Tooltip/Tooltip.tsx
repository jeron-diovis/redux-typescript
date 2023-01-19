import RCTooltip from 'rc-simple-tooltip'

import { ITooltipProps } from './types'

import 'rc-simple-tooltip/dist/styles.css'
import './styles.module.scss'

export function Tooltip(props: ITooltipProps) {
  const {
    position = 'top',
    trigger = 'hover',
    autoWrap = true,
    children,
    ...rest
  } = props

  const Wrapper = autoWrap === true ? 'span' : autoWrap

  return (
    <RCTooltip {...rest} {...{ position, trigger }}>
      {Wrapper === false ? (
        children
      ) : (
        <Wrapper
          data-tooltip-ref-anchor="true"
          style={{ display: 'inline-flex' }}
        >
          {children}
        </Wrapper>
      )}
    </RCTooltip>
  )
}
