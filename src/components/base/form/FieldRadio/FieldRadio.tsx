import { FieldPath, FieldValues } from 'react-hook-form'

import { assignRef } from 'src/utils'

import RadioGroup from '../../controls/RadioGroup'
import FieldControl from '../FieldControl'

import { IFieldRadioProps } from './types'

export default function FieldRadio<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>
>(props: IFieldRadioProps<Fields, Name>) {
  const { control, name, rules, refInput, ...rest } = props

  return (
    <FieldControl {...control} name={name} rules={rules}>
      {controller => {
        const {
          field: { ref, ...field },
        } = controller
        return (
          <RadioGroup
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
