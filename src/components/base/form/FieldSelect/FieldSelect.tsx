import { FieldPath, FieldValues } from 'react-hook-form'

import { combineRefs } from 'src/utils'

import Select from '../../controls/Select'
import FieldControl from '../FieldControl'

import { IFieldSelectProps } from './types'

export default function FieldSelect<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>,
  Clearable extends boolean = false
>(props: IFieldSelectProps<Fields, Name, Clearable>) {
  const { control, name, rules, label, defaultValue, ...rest } = props

  return (
    <FieldControl<Fields, Name>
      {...control}
      label={label}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
    >
      {controller => {
        const {
          field: { ref, ...field },
          fieldState: { invalid },
        } = controller
        const { refInput } = rest
        return (
          <Select
            {...rest}
            {...field}
            invalid={invalid}
            refInput={combineRefs(ref, refInput)}
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
