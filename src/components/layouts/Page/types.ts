import { ReactNode } from 'react'

export interface IPageProps {
  title?: ReactNode
  center?: boolean | 'v' | 'h'
  children: ReactNode
}
