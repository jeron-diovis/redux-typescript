import { DateTime } from 'src/types'

export interface IDateFormatProps {
  children: DateTime
  format?: string // @see https://date-fns.org/v2.21.3/docs/format
}
