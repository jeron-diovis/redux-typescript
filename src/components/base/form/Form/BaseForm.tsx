import React, { useCallback, useRef } from 'react'
import {
  FieldValues,
  FormProvider,
  Path,
  UseFormReturn,
  useForm,
  useFormState,
} from 'react-hook-form'

import ErrorMessage, {
  IErrorMessageProps,
} from 'src/components/base/ErrorMessage'

import FormDebug from './FormDebug'
import { IBaseFormProps } from './types'

const noop = () => {}

const FORM_ERROR_KEY_NAME = '@@/form-global-error' as Path<unknown>

export function BaseForm<TFieldValues extends FieldValues = FieldValues>(
  props: IBaseFormProps<TFieldValues>
) {
  const {
    debug = process.env.REACT_APP_DEBUG_FORMS === 'true',
    style,
    className,
    children,
    onSubmit,
    onValidationError,
    onSubmitError,
    mode = 'onChange',
    reset: resetOptions,
    ...config
  } = props

  const form = usePatchFormRegister(useForm({ mode, ...config }))
  const handleSubmit = form.handleSubmit(onSubmit ?? noop, onValidationError)

  const refForm = useRef(form)
  refForm.current = form

  const refResetOptions = useRef(resetOptions)
  refResetOptions.current = resetOptions

  // provide support of 'form error' property in errors dict
  const onSubmitWithFormError = useCallback(
    async e => {
      const form = refForm.current
      try {
        form.clearErrors(FORM_ERROR_KEY_NAME)
        await handleSubmit(e)
      } catch (e) {
        const error = e as Error
        form.setError(FORM_ERROR_KEY_NAME, {
          type: FORM_ERROR_KEY_NAME,
          message: error.message,
        })
        onSubmitError?.(error)
      }
    },
    [handleSubmit, onSubmitError]
  )

  const onReset = useCallback(() => {
    const form = refForm.current
    const resetOptions = refResetOptions.current
    if (!resetOptions?.keepErrors) {
      form.clearErrors(FORM_ERROR_KEY_NAME)
    }
    form.reset(undefined, resetOptions)
  }, [])

  return (
    <FormProvider {...form}>
      <form
        className={className}
        style={style}
        onSubmit={onSubmitWithFormError}
        // Although it's not recommended to invoke `reset` in `onReset` callback,
        // don't see any issues with this so far.
        // @see https://react-hook-form.com/api/useform/reset
        onReset={onReset}
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

// ---

/**
 * Allow to use `setValueAs` handler on any control – either created with 'register' func directly or via `useController` hook.
 * @see https://react-hook-form.com/api/useform/register
 *
 * Not sure why it is not allowed out of the box, internal logic of hook-form is very complicated.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function usePatchFormRegister<T extends UseFormReturn<any>>(form: T): T {
  /* eslint-disable no-underscore-dangle */
  const { control } = form
  const { register } = control

  type PatchedRegister = typeof control.register & { __patched?: boolean }

  const patchedRegister: PatchedRegister = (...args) => {
    const reg = register(...args)
    return {
      ...reg,
      onChange(e) {
        const { target } = e
        const rules = control._fields?.[target.name]?._f
        // This means it's fake event, provided by `useController`
        // @see https://github.com/react-hook-form/react-hook-form/blob/7f621940883e49a56552c4e9c61af2f50a0528a9/src/useController.ts#L108
        if (target.type === undefined) {
          if (rules?.setValueAs) {
            target.value = rules.setValueAs(target.value)
          }
        }
        return reg.onChange(e)
      },
    }
  }
  patchedRegister.__patched = true

  if (!(control.register as PatchedRegister).__patched) {
    control.register = patchedRegister
  }

  return form
}
