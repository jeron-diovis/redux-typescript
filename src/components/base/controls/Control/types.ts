import { CSSProperties, ReactElement, ReactNode } from 'react'

export interface IControlProps extends IStyled {
  label?: ReactNode
  labelPosition?: 'before' | 'after'
  labelVerticalAlign?: 'start' | 'end' | 'center'
  layout?: 'row' | 'col' | CSSProperties['gridTemplateColumns']
  stretch?: boolean
  gap?: number
  error?: string
  errorPosition?: 'bottom' | 'right'
  inline?: boolean
  ignoreContext?: boolean
}

export interface IControlComponentProps extends IControlProps {
  children: ReactElement
}
