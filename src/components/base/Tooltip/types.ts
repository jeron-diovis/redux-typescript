import { ReactHTML, ReactNode } from 'react'

/**
 * Copy-pasted from sources, because author doesn't export types from package.
 * @see https://github.com/RenoFi/react-tooltip/blob/2af228f77a63d83f9771544479d6ceb11067c8c1/src/Component.tsx#L23-L30
 * @see https://github.com/RenoFi/react-tooltip/issues/270
 */
interface RCTooltipProps extends IStyled {
  active?: boolean
  children?: ReactNode
  content: ReactNode
  position?: TooltipPosition
  trigger?: TooltipTrigger
  timeout?: number
}
export type TooltipPosition = 'bottom' | 'left' | 'right' | 'top'
export type TooltipTrigger = 'click' | 'focus' | 'hover'

// ---

export interface ITooltipProps extends RCTooltipProps {
  // lib works by adding a ref to child component.
  // Which requires certain support from developer, i.e. refs forwarding in your func components.
  // To simplify this, just wrap children in intermediate plain node
  autoWrap?: boolean | keyof ReactHTML
}
