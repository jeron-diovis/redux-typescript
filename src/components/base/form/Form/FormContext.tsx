import { ReactNode } from 'react'
import {
  FieldValues,
  UseFormReturn,
  UseFormStateReturn,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form'

export function FormContext<Values extends FieldValues>(props: {
  children: (data: {
    ctx: UseFormReturn<Values>
    state: UseFormStateReturn<Values>
    values: Values
  }) => ReactNode
}) {
  const { children } = props
  const ctx = useFormContext<Values>()
  const state = useFormState<Values>()
  const values = useWatch<Values>({})
  return (
    <>
      {children({
        ctx,
        state,
        values: values as Values,
      })}
    </>
  )
}
