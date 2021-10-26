import { useState } from 'react'

import * as Cookie from 'tiny-cookie'

import { useOnChange } from './changes'

type CookieValue = string | null

interface CookieOptions<T> extends Cookie.CookieOptions {
  decode?: (x: CookieValue) => T
  encode?: (x: T) => string
}

export default function useCookie<T = CookieValue>(
  name: string,
  options?: CookieOptions<T>
) {
  const {
    decode = (x: CookieValue) => x,
    encode = String,
    ...opts
  } = options ?? {}

  const state = useState<T>(() => decode(Cookie.get(name)) as T)
  const [value] = state

  useOnChange(value, x => {
    if (x === null) {
      Cookie.remove(name)
    } else {
      Cookie.set(name, encode(x), opts)
    }
  })

  return state
}
