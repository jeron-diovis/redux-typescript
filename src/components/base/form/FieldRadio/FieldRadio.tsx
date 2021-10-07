import { FieldPath, FieldValues } from 'react-hook-form'

import { RadioGroup, SelectDataItem } from 'src/components/base/controls'
import { assignRef } from 'src/utils'

import FieldControl from '../FieldControl'

import { IFieldRadioProps } from './types'

export default function FieldRadio<
  ItemType extends SelectDataItem,
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>
>(props: IFieldRadioProps<ItemType, Fields, Name>) {
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
