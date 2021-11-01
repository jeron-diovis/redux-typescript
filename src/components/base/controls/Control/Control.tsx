import React from 'react'

import clsx from 'clsx'

import { ControlContext } from './ControlContext'
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
    layout = 'horizontal',
    children,
    style,
    inline = false,
    stretch = true,
    gap = 8,
    error,
    errorPosition = 'bottom',
  } = ignoreContext ? rest : { ...context, ...rest }

  const resolvedInputStyle = React.useMemo(() => {
    return {
      ...style,
      alignItems: labelVerticalAlign,
      justifyContent: stretch ? 'space-between' : undefined,
      gridTemplateColumns:
        // eslint-disable-next-line no-nested-ternary
        layout === 'vertical'
          ? '1fr'
          : layout === 'horizontal'
          ? 'max-content 1fr'
          : layout,
      gap,
    }
  }, [style, stretch, gap, labelVerticalAlign, layout])

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

  const $input = (
    <div className={styles.input_holder} style={resolvedInputStyle}>
      <If condition={labelPosition === 'before'}>{label}</If>
      {children}
      <If condition={labelPosition === 'after'}>{label}</If>
    </div>
  )

  return (
    <label
      className={clsx(styles.root, contextClassName, ownClassName, {
        [styles.root_inline]: inline,
      })}
    >
      {$input}
      {$error}
    </label>
  )
}

export default React.memo(Control)
