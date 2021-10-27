import { ChangeEvent, ForwardedRef, SelectHTMLAttributes } from 'react'

type SelectValue = string | number

export interface ISelectOption<V extends SelectValue = SelectValue> {
  label: string
  value: V
}

export type SelectDataItem<V extends SelectValue = SelectValue> =
  | V
  | ISelectOption<V>

export type GetSelectOptionValue<T extends SelectDataItem> =
  T extends ISelectOption ? T['value'] : T

export interface ISelectProps<
  T extends SelectDataItem = SelectDataItem,
  Clearable extends boolean = false
> extends Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    'onChange' | 'multiple'
  > {
  data: Readonly<T[]>
  value?: GetSelectOptionValue<T>
  onChange?: Clearable extends false
    ? (value: GetSelectOptionValue<T>, item: T, e: ChangeEvent) => void
    : (
        value: GetSelectOptionValue<T> | undefined,
        item: T | undefined,
        e: ChangeEvent
      ) => void
  clearable?: Clearable
  refInput?: ForwardedRef<HTMLSelectElement>
}
