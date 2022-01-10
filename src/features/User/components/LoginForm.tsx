import { unwrapResult } from '@reduxjs/toolkit'

import {
  ControlSettings,
  FieldInput,
  Fieldset,
  Form,
  Hint,
} from 'src/components'
import { useDispatch } from 'src/hooks'

import { login } from '../thunks'
import { ILoginFormFields } from '../types'

export function LoginForm() {
  const dispatch = useDispatch()
  return (
    <Form<ILoginFormFields>
      onSubmit={async values => {
        unwrapResult(await dispatch(login(values)))
      }}
      style={{ width: 250 }}
    >
      <p>
        <Hint>demo: use 'test / test' credentials to log in</Hint>
      </p>

      <ControlSettings layout="col">
        <Fieldset>
          <FieldInput<ILoginFormFields>
            name="username"
            rules={{
              required: true,
            }}
          />

          <FieldInput<ILoginFormFields, 'password', 'password'>
            name="password"
            type="password"
            rules={{
              required: true,
            }}
          />
        </Fieldset>
      </ControlSettings>
    </Form>
  )
}
