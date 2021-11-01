import React, { HTMLInputTypeAttribute } from 'react'

import clsx from 'clsx'

import { IInputProps } from './types'

import styles from './styles.module.scss'

const noop = () => {}

function BaseInput<Type extends HTMLInputTypeAttribute = 'text'>(
  props: IInputProps<Type>
) {
  const {
    className,
    type = 'text',
    value = '',
    invalid = false,
    onChange = noop,
    refInput,
    // This covers console warnings, which Chrome generates for password fields without `autocomplete` attr
    autoComplete = type === 'password' ? 'password' : undefined,
    ...rest
  } = props

  return (
    <input
      {...rest}
      className={clsx(className, {
        [styles.invalid]: invalid,
      })}
      ref={refInput}
      type={type}
      autoComplete={autoComplete}
      value={value}
      onChange={e => {
        onChange(e.target.value, e)
      }}
    />
  )
}

export default React.memo(BaseInput) as typeof BaseInput
