import { FieldPath, FieldPathValue, FieldValues } from 'react-hook-form'

import { IRadioGroupProps, RadioDataItem } from '../../controls/RadioGroup'
import { IFormFieldProps } from '../FieldControl'

export interface IFieldRadioProps<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>
> extends IFormFieldProps<
    IRadioGroupProps<RadioDataItem<FieldPathValue<Fields, Name>>>,
    Fields,
    Name
  > {}
