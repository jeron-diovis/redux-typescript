import { cloneElement } from 'react'
import { FieldValues } from 'react-hook-form'

import { Button, Grid } from 'src/components/base/index'

import { BaseForm, FormSubmitError } from './BaseForm'
import { IFormProps } from './types'

export default function Form<TFieldValues extends FieldValues = FieldValues>(
  props: IFormProps<TFieldValues>
) {
  const {
    reset = false,
    btnResetText = 'Reset',
    btnSubmitText = 'Submit',
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
            columns={isResettable ? 2 : 1}
            columnWidth="max-content"
            style={{
              justifyContent: 'flex-end',
            }}
          >
            <If condition={isResettable}>
              <Button type="reset" disabled={isSubmitting}>
                {btnResetText}
              </Button>
            </If>

            <Button type="submit" disabled={isSubmitting}>
              {btnSubmitText}
            </Button>
          </Grid>
        )

        if (typeof children === 'function') {
          return children(form, { controls: $controls, error: $error })
        }

        const $footer = (
          <Grid style={{ marginTop: 8, justifyContent: 'flex-end' }} gap={8}>
            {cloneElement($error, { bordered: true })}
            {$controls}
          </Grid>
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
