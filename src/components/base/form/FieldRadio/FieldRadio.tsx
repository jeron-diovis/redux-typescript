import { FieldPath, FieldValues } from 'react-hook-form'

import { assignRef } from 'src/utils'

import RadioGroup, { RadioDataItem } from '../../controls/RadioGroup'
import FieldControl from '../FieldControl'

import { IFieldRadioProps } from './types'

export default function FieldRadio<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>,
  ItemType extends RadioDataItem = RadioDataItem
>(props: IFieldRadioProps<Fields, Name, ItemType>) {
  const { control, name, rules, refInput, ...rest } = props

  return (
    <FieldControl {...control} name={name} rules={rules}>
      {controller => {
        const {
          field: { ref, ...field },
        } = controller
        return (
          <RadioGroup<ItemType>
            {...rest}
            {...field}
            refInput={
              refInput === undefined
                ? ref
                : x => {
                    assignRef(ref, x)
                    assignRef(refInput, x)
                  }
            }
            onChange={field.onChange}
          />
        )
      }}
    </FieldControl>
  )
}
