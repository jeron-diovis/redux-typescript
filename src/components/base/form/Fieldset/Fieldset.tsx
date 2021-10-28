import React, { HTMLAttributes } from 'react'

import clsx from 'clsx'

import { Grid } from 'src/components/base'
import stylesControl from 'src/components/base/controls/Control/styles.module.scss'

import styles from './styles.module.scss'

export interface IFieldsetProps extends HTMLAttributes<HTMLFieldSetElement> {
  disabled?: boolean
}

const Fieldset: React.FC<IFieldsetProps> = props => {
  const { children, className, ...rest } = props
  return (
    <fieldset {...rest} className={clsx(styles.fieldset, className)}>
      <Grid
        gap={stylesControl.control_error_spacing}
        className={styles.padded_grid}
      >
        {children}
      </Grid>
    </fieldset>
  )
}

export default Fieldset
