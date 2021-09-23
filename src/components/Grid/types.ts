import { CSSProperties, ReactNode } from 'react'

export interface IGridProps {
  children: ReactNode
  columns?: number
  gap?: number
  columnWidth?: 'stretch' | string
  style?: CSSProperties
  className?: string
}
