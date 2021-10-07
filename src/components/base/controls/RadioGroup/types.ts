import { ChangeEvent, ReactHTML } from 'react'

import { IInputProps } from '../Input'

type RadioValue = string | number

interface IOption {
  label: string
  value: RadioValue
}

export type RadioDataItem = RadioValue | IOption
export type GetOptionValue<T extends RadioDataItem> = T extends IOption
  ? T['value']
  : T

export interface IRadioGroupProps<T extends RadioDataItem>
  extends Omit<IInputProps<'radio'>, 'onChange' | 'value' | 'type'> {
  data: T[]
  value?: T
  onChange?: (value: GetOptionValue<T>, item: T, e: ChangeEvent) => void
  tag?: keyof ReactHTML
}
