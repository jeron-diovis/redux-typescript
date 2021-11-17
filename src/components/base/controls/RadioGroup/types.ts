import { CSSProperties, ChangeEvent, ReactElement } from 'react'

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
  extends Pick<
    IInputProps<'radio'>,
    'invalid' | 'refInput' | 'name' | 'disabled'
  > {
  data: Readonly<T[]>
  value?: GetRadioOptionValue<T>
  onChange?: (value: GetRadioOptionValue<T>, item: T, e: ChangeEvent) => void
  renderOption?: (params: {
    option: T
    $input: ReactElement
    $label: ReactElement
  }) => ReactElement
  optionClassName?: string
  optionStyle?: CSSProperties
  layout?: 'row' | 'col' | ((children: ReactElement) => ReactElement)
}
