import { FieldPath, FieldValues } from 'react-hook-form'

import {
  IRadioGroupProps,
  RadioDataItem,
} from '../../controls/RadioGroup/types'
import { IFormFieldProps } from '../FieldControl'

export interface IFieldRadioProps<
  ItemType extends RadioDataItem,
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>
> extends IFormFieldProps<IRadioGroupProps<ItemType>, Fields, Name> {}
