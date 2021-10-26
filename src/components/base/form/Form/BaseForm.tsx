import { useCallback } from 'react'
import {
  FieldValues,
  FormProvider,
  Path,
  useForm,
  useFormState,
} from 'react-hook-form'

import ErrorComponent, { IErrorProps } from 'src/components/base/ErrorComponent'

import FormDebug from './FormDebug'
import { IBaseFormProps } from './types'

const noop = () => {}

const FORM_ERROR_KEY_NAME = '@@/form-global-error' as Path<unknown>

export function BaseForm<TFieldValues extends FieldValues = FieldValues>(
  props: IBaseFormProps<TFieldValues>
) {
  const {
    debug,
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

  const form = useForm({ mode, ...config })
  const handleSubmit = form.handleSubmit(onSubmit ?? noop, onValidationError)

  // provide support of 'form error' property in errors dict
  const onSubmitWithFormError = useCallback(
    async e => {
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
    [form, handleSubmit, onSubmitError]
  )

  const onReset = useCallback(() => {
    if (!resetOptions?.keepErrors) {
      form.clearErrors(FORM_ERROR_KEY_NAME)
    }
    form.reset(undefined, resetOptions)
  }, [form, resetOptions])

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

export function FormSubmitError(props: Omit<IErrorProps, 'children'>) {
  const { errors } = useFormState()
  return (
    <ErrorComponent {...props}>
      {errors[FORM_ERROR_KEY_NAME]?.message}
    </ErrorComponent>
  )
}
