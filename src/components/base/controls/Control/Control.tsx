import React from 'react'

import clsx from 'clsx'

import { ControlContext } from './ControlContext'
import { useContentStyle } from './lib'
import { IControlComponentProps } from './types'

import styles from './styles.module.scss'

const DEFAULT_ERROR_TEXT = 'This field is invalid'

function Control(props: IControlComponentProps) {
  const { ignoreContext = false, className: ownClassName, ...rest } = props
  const { className: contextClassName, ...context } =
    React.useContext(ControlContext)

  const {
    label,
    labelPosition = 'before',
    labelVerticalAlign = 'center',
    layout = 'row',
    children,
    style,
    inline = false,
    stretch = true,
    gap = 8,
    error,
    errorPosition = 'bottom',
  } = ignoreContext ? rest : { ...context, ...rest }

  const $error =
    error === undefined ? undefined : (
      <span
        className={clsx(styles.error, {
          [styles.error_bottom]: errorPosition === 'bottom',
          [styles.error_right]: errorPosition === 'right',
        })}
      >
        {error || DEFAULT_ERROR_TEXT}
      </span>
    )

  const $content = (
    <div
      className={styles.content}
      style={useContentStyle({
        style,
        labelVerticalAlign,
        layout,
        stretch,
        gap,
      })}
    >
      <If condition={labelPosition === 'before'}>{label}</If>
      {/* Control expects a single input child.
      Although it can be bypassed with Fragment, but that's completely up you then. */}
      {React.Children.only(children)}
      <If condition={labelPosition === 'after'}>{label}</If>
    </div>
  )

  return (
    <label
      className={clsx(styles.control, contextClassName, ownClassName, {
        [styles.control_inline]: inline,
      })}
    >
      {$content}
      {$error}
    </label>
  )
}

export default React.memo(Control)
