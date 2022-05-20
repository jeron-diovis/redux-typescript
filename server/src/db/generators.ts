import Casual from 'casual'
import { sample as baseSample } from 'lodash'
import moment, { unitOfTime } from 'moment'

import { HOST, PORT, WEB_PATH_STATIC } from '../const'

interface CustomGenerators {
  iso_now: string
  iso_offset: (offset?: number, unit?: unitOfTime.DurationConstructor) => string
  file: (path: string) => string
  photo: (w?: number, h?: number) => string
}

Casual.define('iso_now', () => moment().format())

Casual.define(
  'iso_offset',
  (offset: number, unit: unitOfTime.DurationConstructor) => {
    const m = moment()
    const units: unitOfTime.DurationConstructor[] = [
      'h',
      'm',
      's',
      'd',
      'm',
      's',
    ]
    const args = [
      Math.abs(offset ?? Casual.integer(-24, 24)),
      unit ?? baseSample(units),
    ]
    const modified = offset < 0 ? m.subtract(...args) : m.add(...args)
    return modified.format()
  }
)

Casual.define(
  'file',
  (path: string) => `http://${HOST}:${PORT}/${WEB_PATH_STATIC}/${path}`
)

Casual.define('photo', (w: number, h: number) => {
  const id = Casual.integer(1, 1000)
  const DEFAULT_SIZE = 200
  // can't use defaults in func params, because Casual will treat such generator as getter prop
  const size = [w ?? DEFAULT_SIZE, h ?? w ?? DEFAULT_SIZE]
    .filter(x => x !== undefined)
    .join('/')
  return `https://picsum.photos/seed/${id}/${size}`
})

// ---

Casual.seed(123) // produce same results over re-runs

// ---

const ExtraCasual = Casual as typeof Casual & CustomGenerators

export default ExtraCasual

export const list = <T>(n: number, fn: (i: number) => T) =>
  Array.from(new Array(n), (_, i) => fn(i))

// Better typed version without `undefined` in return value
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ISample = <T>(xs: T[] | Record<any, T>) => T
export const sample = baseSample as ISample
