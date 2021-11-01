import React, { useMemo } from 'react'
import {
  FieldError,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form'

import { capitalize } from 'lodash'

import { Control } from 'src/components/base/controls'
import { useClosureCallback } from 'src/hooks'
import { ErrorType, getDefaultMsg } from 'src/validation'

import { IFieldControlComponentProps } from './types'

export default function FieldControl<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>
>(props: IFieldControlComponentProps<Fields, Name>) {
  const {
    name,
    rules,
    children,
    shouldUnregister,
    label = capitalize(name),
    ...rest
  } = props

  const controller = useMemoController({
    name,
    rules,
    shouldUnregister,
  })

  const error = controller.fieldState.error as FieldError

  let defaultMsg
  if (error !== undefined && rules !== undefined) {
    const { value } = controller.field
    // Do this assertion, because react-hook-form types
    // include in a `error.type` a lot of extra keys not related to validation.
    // In reality, they can't ever appear as `error.type`. But types assume it's possible.
    const type = error.type as ErrorType
    const rule = rules[type]
    defaultMsg = getDefaultMsg(type, rule, value)
  }

  return (
    <Control {...rest} label={label} error={defaultMsg ?? error?.message}>
      {typeof children === 'function'
        ? children(controller)
        : React.cloneElement(React.Children.only(children), controller.field)}
    </Control>
  )
}

// ---

// Memoize callbacks, provided by `controller.field`
const useMemoController: typeof useController = (...args) => {
  const controller = useController(...args)
  const { field } = controller

  const onChange = useClosureCallback(field.onChange)
  const onBlur = useClosureCallback(field.onBlur)
  const ref = useClosureCallback(field.ref)

  controller.field = useMemo(
    () => ({
      name: field.name,
      value: field.value,
      onChange,
      onBlur,
      ref,
    }),
    [field.name, field.value, onChange, onBlur, ref]
  )

  return controller
}
