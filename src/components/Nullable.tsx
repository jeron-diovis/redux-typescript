import { ReactElement } from 'react'

interface INullableProps<T> {
  value: T
  placeholder?: string
  children?: (x: NonNullable<T>) => ReactElement
}

export default function Nullable<T>(props: INullableProps<T>) {
  const { value, children, placeholder = 'N/A' } = props

  if (value === null || value === undefined) {
    return <>{placeholder}</>
  }

  if (children === undefined) {
    return <>{value}</>
  }

  return children(value as NonNullable<T>)
}
