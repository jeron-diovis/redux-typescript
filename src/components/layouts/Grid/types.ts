import { CSSProperties, ReactHTML, ReactNode } from 'react'

export interface IGridProps extends IStyled {
  children: ReactNode
  tag?: keyof ReactHTML
  gap?: number | string
  autoColumns?: CSSProperties['gridAutoColumns']
  autoRows?: CSSProperties['gridAutoRows']

  // true – use `grid-auto-flow: "column"`
  // number – explicit columns number with width of `autoColumn`
  // string – value for `gridTemplateColumns` prop
  columns?: true | number | CSSProperties['gridTemplateColumns']
}
