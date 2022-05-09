import React, { HTMLAttributes } from 'react'

import clsx from 'clsx'

import stylesControl from 'src/components/base/controls/Control/styles.module.scss'
import { Grid, IGridProps } from 'src/components/layouts'

import styles from './styles.module.scss'

export interface IFieldsetProps extends HTMLAttributes<HTMLFieldSetElement> {
  disabled?: boolean
  grid?: Omit<IGridProps, 'children'>
}

const Fieldset: React.FC<IFieldsetProps> = props => {
  const { children, className, grid, ...rest } = props
  return (
    <fieldset {...rest} className={clsx(styles.fieldset, className)}>
      <Grid
        gap={stylesControl.control_error_spacing}
        {...grid}
        className={clsx(grid?.className, styles.padded_grid)}
      >
        {children}
      </Grid>
    </fieldset>
  )
}

export default Fieldset
