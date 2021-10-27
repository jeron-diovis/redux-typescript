import { ChangeEvent, ReactHTML } from 'react'

import { IInputProps } from '../Input'

type RadioValue = string | number

export interface IRadioOption<V extends RadioValue = RadioValue> {
  label: string
  value: V
}

export type RadioDataItem<V extends RadioValue = RadioValue> =
  | V
  | IRadioOption<V>

export type GetRadioOptionValue<T extends RadioDataItem> =
  T extends IRadioOption ? T['value'] : T

export interface IRadioGroupProps<T extends RadioDataItem = RadioDataItem>
  extends Omit<IInputProps<'radio'>, 'onChange' | 'value' | 'type'> {
  data: T[]
  value?: T
  onChange?: (value: GetRadioOptionValue<T>, item: T, e: ChangeEvent) => void
  tag?: keyof ReactHTML
}
