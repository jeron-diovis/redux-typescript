import { IInputProps } from './types'

const noop = () => {}

export default function Input(props: IInputProps) {
  const {
    label,
    labelPosition = 'before',
    type = 'text',
    value = '',
    onChange = noop,
    ...rest
  } = props

  return (
    <label>
      <If condition={labelPosition === 'before'}>{label}</If>

      <input
        {...rest}
        type={type}
        value={value}
        onChange={e => {
          onChange(e.target.value, e)
        }}
      />

      <If condition={labelPosition === 'after'}>{label}</If>
    </label>
  )
}
