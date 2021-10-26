import { FieldPath, FieldValues } from 'react-hook-form'

import { IRadioGroupProps, RadioDataItem } from '../../controls/RadioGroup'
import { IFormFieldProps } from '../FieldControl'

export interface IFieldRadioProps<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>,
  ItemType extends RadioDataItem = RadioDataItem
> extends IFormFieldProps<IRadioGroupProps<ItemType>, Fields, Name> {}
