import { HTMLInputTypeAttribute } from 'react'
import { FieldPath, FieldValues } from 'react-hook-form'

import { combineRefs } from 'src/utils'

import Input from '../../controls/Input'
import FieldControl from '../FieldControl'

import { IFieldInputProps } from './types'

export default function FieldInput<
  Fields extends FieldValues = FieldValues,
  Name extends FieldPath<Fields> = FieldPath<Fields>,
  Type extends HTMLInputTypeAttribute = 'text'
>(props: IFieldInputProps<Fields, Name, Type>) {
  const { control, name, rules, ...rest } = props

  return (
    <FieldControl<Fields, Name>
      {...control}
      name={name}
      rules={rules}
      key={name}
    >
      {controller => {
        const {
          field: { ref, ...field },
          fieldState,
        } = controller
        const { invalid } = fieldState
        const { refInput } = rest
        return (
          <Input<Type>
            {...rest}
            {...field}
            refInput={combineRefs(ref, refInput)}
            invalid={invalid}
          />
        )
      }}
    </FieldControl>
  )
}
