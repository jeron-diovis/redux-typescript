import React from 'react'

import clsx from 'clsx'

import { ControlContext } from './ControlContext'
import { useContentStyle } from './lib'
import { IControlComponentProps } from './types'

import styles from './styles.module.scss'

const DEFAULT_ERROR_TEXT = 'This field is invalid'
const DEFAULT_LAYOUT: IControlComponentProps['layout'] = 'col'
const DEFAULT_JUSTIFY: IControlComponentProps['justify'] = 'space-between'

function Control(props: IControlComponentProps) {
  const { ignoreContext = false, className: ownClassName, ...rest } = props
  const { className: contextClassName, ...context } =
    React.useContext(ControlContext)

  const {
    label,
    layout = 'col',
    labelPosition = 'before',
    labelVerticalAlign = 'center',
    children,
    style,
    inline = false,
    justify,
    gap = 8,
    error,
    errorPosition = 'bottom',
    showError = true,
  } = ignoreContext ? rest : { ...context, ...rest }

  const $error =
    error === undefined || !showError ? undefined : (
      <span
        className={clsx(styles.error, {
          [styles.error_bottom]: errorPosition === 'bottom',
          [styles.error_right]: errorPosition === 'right',
        })}
      >
        {error || DEFAULT_ERROR_TEXT}
      </span>
    )

  const hasLabel = !(label === '' || label === null || label === undefined)

  const $content = (
    <div
      className={styles.content}
      style={useContentStyle({
        style,
        labelVerticalAlign,
        gap,

        // If label is not specified, don't apply any additional styles to align it with input.
        // Just render input as it is.
        layout: layout ?? (hasLabel ? DEFAULT_LAYOUT : undefined),
        justify: justify ?? (hasLabel ? DEFAULT_JUSTIFY : undefined),
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
