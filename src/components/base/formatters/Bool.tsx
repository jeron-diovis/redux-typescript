import { formatBool } from 'src/utils'

export function Bool(props: { children: boolean }) {
  const { children: value } = props
  return <>{formatBool(value)}</>
}
