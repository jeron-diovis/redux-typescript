import { ReactHTML, ReactNode } from 'react'

export interface IGridProps extends IStyled {
  children: ReactNode
  tag?: keyof ReactHTML
  columns?: number
  gap?: number | string
  columnWidth?: 'stretch' | string
}
