import { ReactNode } from 'react'

export interface IPageProps {
  title?: string
  center?: boolean | 'v' | 'h'
  children: ReactNode
}
