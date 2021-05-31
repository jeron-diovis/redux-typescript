import { ReactNode } from 'react'

export interface IGridProps {
  children: ReactNode
  columns?: number
  gap?: number
  columnWidth?: 'stretch' | 'auto' | string
}
