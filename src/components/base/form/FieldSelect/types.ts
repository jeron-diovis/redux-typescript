import { FieldPath, FieldValues } from 'react-hook-form'

import { ISelectProps, SelectDataItem } from 'src/components/base/controls'

import { IFormFieldProps } from '../FieldControl'

export interface IFieldSelectProps<
  ItemType extends SelectDataItem,
  Clearable extends boolean = false,
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>
> extends IFormFieldProps<ISelectProps<ItemType, Clearable>, Fields, Name> {}
