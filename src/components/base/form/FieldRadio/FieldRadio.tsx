import { FieldPath, FieldValues } from 'react-hook-form'

import { combineRefs } from 'src/utils'

import RadioGroup from '../../controls/RadioGroup'
import FieldControl from '../FieldControl'

import { IFieldRadioProps } from './types'

export default function FieldRadio<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>
>(props: IFieldRadioProps<Fields, Name>) {
  const { control, name, rules, ...rest } = props

  return (
    <FieldControl<Fields, Name> {...control} name={name} rules={rules}>
      {controller => {
        const {
          field: { ref, ...field },
        } = controller
        const { refInput } = rest
        return (
          <RadioGroup
            {...rest}
            {...field}
            refInput={combineRefs(ref, refInput)}
            onChange={field.onChange}
          />
        )
      }}
    </FieldControl>
  )
}
