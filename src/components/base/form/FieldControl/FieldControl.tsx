import React, { ReactElement, Ref, useMemo } from 'react'
import {
  FieldError,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form'

import { Control } from 'src/components/base/controls'
import { useClosureCallback } from 'src/hooks'
import { combineRefs } from 'src/utils'
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
    label,
    defaultValue,
    render,
    ...rest
  } = props

  const controller = useMemoController({
    name,
    rules,
    shouldUnregister,
    defaultValue,
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

  function renderContent() {
    if (typeof children === 'function') {
      return children(controller)
    }

    const child = React.Children.only(children) as ReactElement & {
      ref: Ref<unknown>
    }
    return React.cloneElement(
      child,
      child.ref === undefined
        ? controller.field
        : {
            ...controller.field,
            ref: combineRefs(child.ref, controller.field.ref),
          }
    )
  }

  return (
    <Control
      {...rest}
      label={label}
      error={error?.message || defaultMsg}
      render={
        render === undefined
          ? undefined
          : params => render({ ...params, controller })
      }
    >
      {renderContent()}
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
