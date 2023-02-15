/* eslint-disable no-console */
const noop = () => {}

export function getLogger(
  enabled: boolean,
  key: string,
  fn: () => void,
  deps: unknown[]
) {
  if (!enabled) return noop
  return (...args: unknown[]) => {
    console.group(`[useSuspense] ${fn.name}`)
    console.log(...args)
    console.log('Args: %o', deps)

    console.groupCollapsed('Cache key')
    console.log(key)
    console.groupEnd()

    console.groupCollapsed('Loader function')
    console.log(fn)
    console.groupEnd()

    console.groupEnd()
  }
}

export const clr = (colour: string) => `font-weight: bold; color: ${colour}`
