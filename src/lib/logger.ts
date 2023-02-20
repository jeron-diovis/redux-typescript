/* eslint-disable no-console */
const noop = () => {}

interface Logger {
  load(isForced?: boolean): void
  loading(): void
  overflow(value: unknown): void
  success(value: unknown, isFirstLoad?: boolean): void
  error(e: Error): void
}

const dummy: Logger = {
  load: noop,
  loading: noop,
  overflow: noop,
  success: noop,
  error: noop,
}

const clr = (colour: string) => `font-weight: bold; color: ${colour}`

export function getLogger(
  enabled: boolean,
  label: string,
  key: string,
  prevKey: string | undefined,
  fn: () => void,
  deps: unknown[]
): Logger {
  if (!enabled) return dummy

  const log = (...args: unknown[]) => {
    const keyLabel =
      prevKey === undefined || prevKey === key ? key : `${key} <= ${prevKey}`

    console.group(`[useSuspense] [${keyLabel}] ${label}`)
    console.log(...args)
    if (deps.length > 0) {
      console.log('Args: %o', deps)
    }

    console.groupCollapsed('Loader function')
    console.log(fn)
    console.groupEnd()

    console.groupEnd()
  }

  return {
    load(isForced) {
      log(
        `%c${
          isForced ? 'Force reload requested' : 'No state found in cache'
        }\n%cLoading started`,
        isForced ? clr('orangered') : '',
        clr('blue')
      )
    },

    loading() {
      log(
        'No state found in cache.\n%cThis resource is already loading.',
        clr('cornflowerblue')
      )
    },

    overflow(value) {
      log(
        "Key didn't change, but no state found in cache\nProbably cache got overflown\nReturning a value saved in hook\n%o",
        value
      )
    },

    success(value, isFirstLoad) {
      if (isFirstLoad) {
        log(`%cLoading succeeded\n%o`, clr('green'), value)
      } else {
        log(`%cRead from cache\n%o`, clr('mediumpurple'), value)
      }
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
