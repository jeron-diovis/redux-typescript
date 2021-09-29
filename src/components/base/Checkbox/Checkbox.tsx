import Input from '../Input'

import { ICheckboxProps } from './types'

const noop = () => {}

export default function Checkbox<Value extends string>(
  props: ICheckboxProps<Value>
) {
  const {
    labelPosition = 'after',
    value,
    checked = false,
    onChange = noop,
    ...rest
  } = props

  return (
    <Input
      {...rest}
      type="checkbox"
      labelPosition={labelPosition}
      checked={checked}
      value={value}
      onChange={(_, e) => {
        const { value, checked } = e.target
        onChange(checked, value as Value)
      }}
    />
  )
}
