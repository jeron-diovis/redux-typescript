import { HTMLInputTypeAttribute } from 'react'
import { FieldPath, FieldValues } from 'react-hook-form'

import { Input } from 'src/components/base/controls'
import { assignRef } from 'src/utils'

import FieldControl from '../FieldControl'

import { IFieldInputProps } from './types'

export default function FieldInput<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>,
  Type extends HTMLInputTypeAttribute = 'text'
>(props: IFieldInputProps<Fields, Name, Type>) {
  const { control, name, rules, refInput, ...rest } = props

  return (
    <FieldControl {...control} name={name} rules={rules} key={name}>
      {controller => {
        const {
          field: { ref, ...field },
          fieldState,
        } = controller
        const { invalid } = fieldState
        return (
          <Input<Type>
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
            invalid={invalid}
          />
        )
      }}
    </FieldControl>
  )
}
