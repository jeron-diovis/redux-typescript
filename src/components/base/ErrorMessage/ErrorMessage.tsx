import React from 'react'

import clsx from 'clsx'

import { resolveErrorMessage } from 'src/utils'

import styles from './styles.module.scss'

export interface IErrorMessageProps extends IStyled {
  children: unknown
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
  if (error === undefined || error === null || error === '') {
    return null
  }
  return (
    <Tag
      className={clsx(className, styles.root, {
        [styles.bordered]: bordered,
      })}
      style={style}
    >
      {resolveErrorMessage(error)}
    </Tag>
  )
})

export default ErrorMessage
