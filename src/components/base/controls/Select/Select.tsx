import React from 'react'

import { GetSelectOptionValue, ISelectProps, SelectDataItem } from './types'

const noop = () => {}
const isPrimitive = (x: SelectDataItem): x is string | number =>
  typeof x === 'string' || typeof x === 'number'
const getValue = (x: SelectDataItem) => (isPrimitive(x) ? x : x.value)
const getLabel = (x: SelectDataItem) => (isPrimitive(x) ? x : x.label)
const EMPTY_VALUE = ''

function Select<
  T extends SelectDataItem = SelectDataItem,
  Clearable extends boolean = false
>(props: ISelectProps<T, Clearable>) {
  const {
    data,
    value = EMPTY_VALUE,
    placeholder = 'Select...',
    clearable = false,
    onChange = noop,
    refInput,
    ...rest
  } = props

  return (
    <select
      {...rest}
      ref={refInput}
      value={value}
      onChange={e => {
        const selectValue = e.target.value
        const item = data.find(x => getValue(x).toString() === selectValue)
        const itemValue = item === undefined ? undefined : getValue(item)
        onChange(itemValue as GetSelectOptionValue<T>, item as T, e)
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
  )
}

export default React.memo(Select) as typeof Select
