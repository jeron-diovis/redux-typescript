import { FieldPath, FieldValues } from 'react-hook-form'

import { Select, SelectDataItem } from 'src/components/base/controls'
import { assignRef } from 'src/utils'

import FieldControl from '../FieldControl'

import { IFieldSelectProps } from './types'

export default function FieldSelect<
  ItemType extends SelectDataItem,
  Clearable extends boolean = false,
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>
>(props: IFieldSelectProps<ItemType, Clearable, Fields, Name>) {
  const { control, name, rules, refInput, ...rest } = props

  return (
    <FieldControl {...control} name={name} rules={rules}>
      {controller => {
        const {
          field: { ref, ...field },
        } = controller
        return (
          <Select<ItemType, Clearable>
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
            onChange={
              // Type '(...event: any[]) => void' is not assignable to type 'Clearable extends false ? .. : ...
              field.onChange as any /* eslint-disable-line @typescript-eslint/no-explicit-any */
            }
          />
        )
      }}
    </FieldControl>
  )
}
