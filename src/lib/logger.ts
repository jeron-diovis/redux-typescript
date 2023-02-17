/* eslint-disable no-console */
const noop = () => {}

interface Logger {
  loading(prevKey: string | undefined): void
  reading(value: unknown): void
  success(value: unknown): void
  error(e: Error): void
}

const dummy: Logger = {
  loading: noop,
  reading: noop,
  success: noop,
  error: noop,
}

const clr = (colour: string) => `font-weight: bold; color: ${colour}`

export function getLogger(
  enabled: boolean,
  label: string,
  key: string,
  fn: () => void,
  deps: unknown[]
): Logger {
  if (!enabled) return dummy

  const log = (...args: unknown[]) => {
    console.group(`[useSuspense] [key:${key}] ${label}`)
    console.log(...args)
    console.log('Args: %o', deps)

    console.groupCollapsed('Loader function')
    console.log(fn)
    console.groupEnd()

    console.groupEnd()
  }

  const cacheMsg = 'No state found in cache.'
  return {
    loading(prevKey) {
      log(
        `${cacheMsg}\n${
          prevKey === undefined ? '' : 'Key has changed.\n'
        }%cInitiate loading`,
        clr('blue')
      )
    },

    reading(value) {
      log(
        cacheMsg +
          "\nKey didn't change – probably cache got overflown.\nReturn the value saved in hook:\n%o",
        value
      )
    },

    success(value) {
      log(
        '%cLoading succeeded\n%cReading from the suspense cache:\n%o',
        clr('green'),
        '',
        value
      )
    },

    error(/*e*/) {
      /**
       * We could do logging here too, as for all other cases.
       * But due to the twisted weirdness React does when error is thrown,
       * it will spam console with like 4 identical logs.
       * @see https://github.com/facebook/react/issues/16130
       */
      // log('%cLoading failed\n%o', clr('red'), error)
    },
  }
}
