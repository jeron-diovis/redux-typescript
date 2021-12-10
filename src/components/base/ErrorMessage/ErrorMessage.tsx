import React, { ReactNode } from 'react'

import clsx from 'clsx'

import styles from './styles.module.scss'

export interface IErrorMessageProps extends IStyled {
  children: ReactNode
  inline?: boolean
  bordered?: boolean
}

const ErrorMessage = React.memo(function ErrorMessage(
  props: IErrorMessageProps
) {
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
})

export default ErrorMessage
