import { ChangeEvent, ForwardedRef, SelectHTMLAttributes } from 'react'

type SelectValue = string | number

interface IOption {
  label: string
  value: SelectValue
}

export type SelectDataItem = SelectValue | IOption
export type GetSelectOptionValue<T extends SelectDataItem> = T extends IOption
  ? T['value']
  : T

export interface ISelectProps<
  T extends SelectDataItem,
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
