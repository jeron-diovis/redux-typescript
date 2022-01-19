import { useMemo } from 'react'

import { format } from 'date-fns'

import { IDateTimeFormatProps } from './types'

import styles from './styles.module.scss'

const DEFAULT_FORMAT = 'EEE, d MMM yyyy HH:mm:ss OOOO'

export function DateTime(props: IDateTimeFormatProps) {
  const { children: value, format: formatStr = DEFAULT_FORMAT } = props
  const date = useMemo(() => new Date(value), [value])
  return <span className={styles.root}>{format(date, formatStr)}</span>
}
