import { useCallback } from 'react'

import useDebounce from './useDebounce'

/**
 * @see https://stackoverflow.com/a/54669320/3437433
 * @see https://medium.com/trabe/prevent-click-events-on-double-click-with-react-with-and-without-hooks-6bf3697abc40
 */
export default function useClickEventsPair<
  T extends {
    onClick: Func
    onDoubleClick: Func
  }
>(handlers: T): Pick<T, 'onClick' | 'onDoubleClick'> {
  const { onClick, onDoubleClick } = handlers

  // Delay of 170 ms chosen empirically. With lesser values single click is still triggered.
  // Although it's high enough to cause a visually noticeable delay for user.
  const patchedClick = useDebounce(onClick, 170)
  const patchedDblClick = useCallback(
    (...args: Parameters<T['onDoubleClick']>) => {
      patchedClick.cancel()
      onDoubleClick(...args)
    },
    [onDoubleClick, patchedClick]
  )

  return {
    onClick: patchedClick,
    onDoubleClick: patchedDblClick,
  }
}
