import { GetOptionValue, ISelectProps, SelectDataItem } from './types'

const noop = () => {}
const isPrimitive = (x: SelectDataItem): x is string | number =>
  typeof x === 'string' || typeof x === 'number'
const getValue = (x: SelectDataItem) => (isPrimitive(x) ? x : x.value)
const getLabel = (x: SelectDataItem) => (isPrimitive(x) ? x : x.label)
const EMPTY_VALUE = ''

export default function Select<
  T extends SelectDataItem,
  Clearable extends boolean = false
>(props: ISelectProps<T, Clearable>) {
  const {
    data,
    value = EMPTY_VALUE,
    placeholder = 'Select...',
    clearable = false,
    onChange = noop,
    label,
    labelPosition = 'before',
    ...rest
  } = props

  return (
    <label>
      <If condition={labelPosition === 'before'}>{label}</If>

      <select
        {...rest}
        value={value}
        onChange={e => {
          const selectValue = e.target.value
          const item = data.find(x => getValue(x).toString() === selectValue)
          const itemValue = item === undefined ? undefined : getValue(item)
          onChange(itemValue as GetOptionValue<T>, item as unknown as T)
        }}
      >
        <If condition={clearable}>
          <option value={EMPTY_VALUE}>{placeholder}</option>
        </If>
        {data.map(item => (
          <option key={getValue(item)} value={getValue(item)}>
            {getLabel(item)}
          </option>
        ))}
      </select>

      <If condition={labelPosition === 'after'}>{label}</If>
    </label>
  )
}