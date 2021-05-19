import { useCallback } from 'react'

import useDebounce from './useDebounce'

/**
 * @see https://medium.com/trabe/prevent-click-events-on-double-click-with-react-with-and-without-hooks-6bf3697abc40
 */
export default function useClickEventsPair<
  OnClick extends Func,
  OnDoubleClick extends Func
>(handlers: {
  onClick: OnClick
  onDoubleClick: OnDoubleClick
}): typeof handlers {
  const { onClick, onDoubleClick } = handlers

  // Delay of 170 ms chosen empirically. With lesser values single click is still triggered.
  // Although it's high enough to cause a visually noticeable delay for user.
  const patchedClick = useDebounce(onClick, 170)
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
