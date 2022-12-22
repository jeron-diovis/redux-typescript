import { CSSProperties, ReactNode } from 'react'

export interface IPageProps {
  title?: ReactNode
  center?: boolean | 'v' | 'h'
  scrollable?: boolean
  width?: CSSProperties['width']
  children: ReactNode
}
