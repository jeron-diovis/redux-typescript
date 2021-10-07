import { forwardRef } from 'react'

import { assignRef } from 'src/utils'

import Input from '../Input'

import { useIndeterminateRef } from './lib'
import { ICheckboxProps } from './types'

const noop = () => {}

function Checkbox(props: ICheckboxProps) {
  const {
    value,
    checked = false,
    onChange = noop,
    indeterminate = false,
    refInput,
    ...rest
  } = props

  const ref = useIndeterminateRef(indeterminate)

  return (
    <Input
      {...rest}
      refInput={el => {
        assignRef(refInput, el)
        assignRef(ref, el)
      }}
      type="checkbox"
      checked={checked}
      value={value}
      onChange={(_, e) => {
        const { checked } = e.target
        onChange(checked, e)
      }}
    />
  )
}

export default forwardRef<HTMLInputElement, ICheckboxProps>((props, ref) => (
  <Checkbox {...props} refInput={ref} />
))
