import { ReactNode } from 'react'

export interface IGridProps extends IStyled {
  children: ReactNode
  columns?: number
  gap?: number
  columnWidth?: 'stretch' | string
}
