import { ReactNode } from 'react'

export interface IPageProps {
  title?: string
  center?: true | 'v' | 'h'
  children: ReactNode
}
