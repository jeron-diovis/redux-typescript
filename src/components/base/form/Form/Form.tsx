import { CSSProperties, cloneElement } from 'react'
import { FieldValues } from 'react-hook-form'

import { Button } from 'src/components/base'
import { Grid } from 'src/components/layouts'

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
            autoColumns="max-content"
            style={CONTROLS_GRID_STYLE}
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
          <Grid style={FOOTER_GRID_STYLE} gap={8}>
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

// ---

const CONTROLS_GRID_STYLE: CSSProperties = {
  justifyContent: 'flex-end',
}

const FOOTER_GRID_STYLE: CSSProperties = {
  marginTop: 8,
  justifyContent: 'flex-end',
}
