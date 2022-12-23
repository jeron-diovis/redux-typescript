import { CSSProperties, ReactNode } from 'react'

export interface IPageProps {
  title?: ReactNode
  center?: boolean | 'v' | 'h'
  scrollable?: boolean
  style?: CSSProperties
  children: ReactNode
}
