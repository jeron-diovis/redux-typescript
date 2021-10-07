import { ChangeEvent, ForwardedRef, SelectHTMLAttributes } from 'react'

type SelectValue = string | number

interface IOption {
  label: string
  value: SelectValue
}

export type SelectDataItem = SelectValue | IOption
export type GetOptionValue<T extends SelectDataItem> = T extends IOption
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
  value?: GetOptionValue<T>
  onChange?: Clearable extends false
    ? (value: GetOptionValue<T>, item: T, e: ChangeEvent) => void
    : (
        value: GetOptionValue<T> | undefined,
        item: T | undefined,
        e: ChangeEvent
      ) => void
  clearable?: Clearable
  refInput?: ForwardedRef<HTMLSelectElement>
}
