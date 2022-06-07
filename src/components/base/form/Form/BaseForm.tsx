import React from 'react'
import { FieldValues, FormProvider, useFormState } from 'react-hook-form'

import ErrorMessage, {
  IErrorMessageProps,
} from 'src/components/base/ErrorMessage'

import FormDebug from './FormDebug'
import { IBaseFormProps } from './types'
import { FORM_ERROR_KEY_NAME, useForm } from './useForm'

export function BaseForm<TFieldValues extends FieldValues = FieldValues>(
  props: IBaseFormProps<TFieldValues>
) {
  const {
    debug = process.env.REACT_APP_DEBUG_FORMS === 'true',
    style,
    className,
    children,
    mode = 'onChange',
    ...config
  } = props

  const form = useForm({ mode, ...config })

  return (
    <FormProvider {...form}>
      <form
        className={className}
        style={style}
        onSubmit={form.onSubmit}
        // Although it's not recommended to invoke `reset` in `onReset` callback,
        // don't see any issues with this so far.
        // @see https://react-hook-form.com/api/useform/reset
        onReset={form.onReset}
      >
        <If
          condition={debug === true && process.env.NODE_ENV === 'development'}
        >
          <FormDebug />
        </If>

        {typeof children === 'function' ? children(form) : children}
      </form>
    </FormProvider>
  )
}

export const FormSubmitError = React.memo(function FormSubmitError(
  props: Omit<IErrorMessageProps, 'children'>
) {
  const { errors } = useFormState()
  return (
    <ErrorMessage {...props}>
      {errors[FORM_ERROR_KEY_NAME]?.message}
    </ErrorMessage>
  )
})
