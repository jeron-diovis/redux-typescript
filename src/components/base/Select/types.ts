import { SelectHTMLAttributes } from 'react'

import { IInputProps } from '../Input'

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
    >,
    Pick<IInputProps, 'label' | 'labelPosition'> {
  data: Readonly<T[]>
  value?: GetOptionValue<T>
  onChange?: Clearable extends false
    ? (value: GetOptionValue<T>, item: T) => void
    : (value?: GetOptionValue<T>, item?: T) => void
  clearable?: Clearable
}
