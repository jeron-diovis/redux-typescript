import { ReactNode } from 'react'

import clsx from 'clsx'

import styles from './styles.module.scss'

export interface IErrorProps extends IStyled {
  children: ReactNode
  inline?: boolean
  bordered?: boolean
}

export default function ErrorComponent(props: IErrorProps) {
  const {
    children: error,
    inline = false,
    bordered = false,
    className,
    style,
  } = props
  const Tag = inline ? 'span' : 'div'
  return (
    <If condition={error !== undefined && error !== null && error !== ''}>
      <Tag
        className={clsx(className, styles.root, {
          [styles.bordered]: bordered,
        })}
        style={style}
      >
        {error}
      </Tag>
    </If>
  )
}
