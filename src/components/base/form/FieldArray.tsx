import React, { ReactNode } from 'react'
import {
  FieldArrayPath,
  FieldValues,
  UseFieldArrayProps,
  UseFieldArrayReturn,
  useFieldArray,
} from 'react-hook-form'

interface IFieldArrayProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = 'id'
> extends UseFieldArrayProps<TFieldValues, TFieldArrayName, TKeyName> {
  children: (
    params: UseFieldArrayReturn<TFieldValues, TFieldArrayName, TKeyName>
  ) => ReactNode
}

/**
 * @see https://react-hook-form.com/api/usefieldarray/
 * PAY ATTENTION to sections `Rules` and `TypeScript`
 */
export default function FieldArray<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = 'id'
>(props: IFieldArrayProps<TFieldValues, TFieldArrayName, TKeyName>) {
  const { children, ...rest } = props
  return <>{children(useFieldArray(rest))}</>
}
