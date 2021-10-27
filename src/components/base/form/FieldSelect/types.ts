import { FieldPath, FieldPathValue, FieldValues } from 'react-hook-form'

import { ISelectProps, SelectDataItem } from 'src/components/base/controls'

import { IFormFieldProps } from '../FieldControl'

export interface IFieldSelectProps<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>,
  Clearable extends boolean = false
> extends IFormFieldProps<
    ISelectProps<SelectDataItem<FieldPathValue<Fields, Name>>, Clearable>,
    Fields,
    Name
  > {}
