import { cloneElement } from 'react'
import { FieldValues } from 'react-hook-form'

import { Button, ErrorMessage } from 'src/components/base'
import { Grid } from 'src/components/layouts'

import { BaseForm, FormSubmitError } from './BaseForm'
import { IFormProps } from './types'

import styles from './Form.module.scss'

export default function Form<TFieldValues extends FieldValues = FieldValues>(
  props: IFormProps<TFieldValues>
) {
  const {
    reset = false,
    error,
    btnResetText = 'Reset',
    btnSubmitText = 'Submit',
    buttonsLayout = '1fr',
    children,
    ...rest
  } = props

  const isResettable = reset !== false

  return (
    <BaseForm {...rest} reset={typeof reset === 'boolean' ? undefined : reset}>
      {form => {
        const { formState } = form
        const { isSubmitting } = formState

        const $error = <FormSubmitError />
        const $controls = (
          <Grid
            className={styles.controls}
            columns={isResettable ? 2 : 1}
            autoColumns={buttonsLayout}
          >
            <If condition={isResettable}>
              <Button type="reset" disabled={isSubmitting}>
                {btnResetText}
              </Button>
            </If>

            <Button
              type="submit"
              disabled={isSubmitting}
              style={isSubmitting ? { cursor: 'progress' } : undefined}
            >
              {btnSubmitText}
            </Button>
          </Grid>
        )

        const $externalError = (
          <If condition={error !== undefined && error !== null}>
            <ErrorMessage bordered>{error}</ErrorMessage>
          </If>
        )

        if (typeof children === 'function') {
          return children(form, {
            controls: $controls,
            error: $error,
            externalError: $externalError,
          })
        }

        const $footer = (
          <div className={styles.footer}>
            {$controls}
            {cloneElement($error, { bordered: true })}
            {$externalError}
          </div>
        )

        return (
          <>
            {children}
            {$footer}
          </>
        )
      }}
    </BaseForm>
  )
}
