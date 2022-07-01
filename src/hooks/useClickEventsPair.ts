import { useCallback } from 'react'

import { useDebounce } from './useDebounce'

/**
 * @see https://medium.com/trabe/prevent-click-events-on-double-click-with-react-with-and-without-hooks-6bf3697abc40
 */
export function useClickEventsPair<
  OnClick extends Func,
  OnDoubleClick extends Func
>(
  handlers: {
    onClick: OnClick
    onDoubleClick: OnDoubleClick
  },
  opts: { delay?: number } = {}
): typeof handlers {
  const {
    // Delay of 170 ms chosen empirically. With lesser values single click is still triggered.
    // Although it's high enough to cause a visually noticeable delay for user.
    delay = 170,
  } = opts

  const { onClick, onDoubleClick } = handlers

  const patchedClick = useDebounce(onClick, delay)
  const patchedDoubleClick = useCallback(
    (...args: Parameters<OnDoubleClick>) => {
      patchedClick.cancel()
      return onDoubleClick(...args)
    },
    [onDoubleClick, patchedClick]
  )

  return {
    onClick: patchedClick as unknown as OnClick,
    onDoubleClick: patchedDoubleClick as OnDoubleClick,
  }
}
