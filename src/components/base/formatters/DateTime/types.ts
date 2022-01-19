import { DateTime } from 'src/types'

export interface IDateTimeFormatProps {
  children: DateTime
  format?: string // @see https://date-fns.org/v2.21.3/docs/format
}
