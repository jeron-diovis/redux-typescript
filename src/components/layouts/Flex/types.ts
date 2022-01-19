import { CSSProperties, ReactHTML } from 'react'

export interface FlexProps {
  tag?: keyof ReactHTML
  column?: boolean
  gap?: number
  center?: true | 'v' | 'h'
  wrap?: boolean | CSSProperties['flexWrap']
  reverse?: boolean
  inline?: boolean
  className?: string
  style?: CSSProperties
}
