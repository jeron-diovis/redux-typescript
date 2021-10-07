import React, { useContext } from 'react'

import clsx from 'clsx'

import { useChanged } from 'src/hooks'

import { IControlProps } from './types'

type IControlContextParams = Omit<IControlProps, 'label' | 'error'>

export const ControlContext = React.createContext<IControlContextParams>({})

export const ControlSettings: React.FC<IControlContextParams> = props => {
  const { children, ...rest } = props
  const parent = useContext(ControlContext)
  const value = useChanged({
    ...parent,
    ...rest,
    className: clsx(parent.className, rest.className),
    style: useChanged({ ...parent.style, ...rest.style }),
  })
  return (
    <ControlContext.Provider value={value}>{children}</ControlContext.Provider>
  )
}
