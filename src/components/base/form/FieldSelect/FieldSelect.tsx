import { FieldPath, FieldValues } from 'react-hook-form'

import { assignRef } from 'src/utils'

import { Select } from '../../controls'
import FieldControl from '../FieldControl'

import { IFieldSelectProps } from './types'

export default function FieldSelect<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>,
  Clearable extends boolean = false
>(props: IFieldSelectProps<Fields, Name, Clearable>) {
  const { control, name, rules, refInput, ...rest } = props

  return (
    <FieldControl {...control} name={name} rules={rules}>
      {controller => {
        const {
          field: { ref, ...field },
        } = controller
        return (
          <Select
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
