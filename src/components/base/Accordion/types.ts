import { ReactHTML, ReactNode } from 'react'

export interface IAccordionProps extends IStyled {
  tag?: keyof ReactHTML
  children: ReactNode
  header?: ReactNode
  lazy?: boolean
  isOpen?: boolean
  onToggle?: (isOpen: boolean) => void
  maxBodyHeight?: number | string
}
