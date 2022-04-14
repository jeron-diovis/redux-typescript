import React, { ReactNode } from 'react'
import { FieldValues, UseFormReturn, useFormContext } from 'react-hook-form'

interface IFormErrorProps<Values extends FieldValues> {
  submitCount?: number
  children: ReactNode | ((form: UseFormReturn<Values>) => ReactNode)
}

export const FormError = React.memo(function FormError<
  Values extends FieldValues
>(props: IFormErrorProps<Values>) {
  const { submitCount: requiredSubmitCount = 1, children } = props
  const ctx = useFormContext<Values>()
  const { isDirty, isValid, submitCount } = ctx.formState
  if (!isDirty || isValid || submitCount < requiredSubmitCount) return null
  return <>{typeof children === 'function' ? children(ctx) : children}</>
})
