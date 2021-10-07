import React from 'react'

import { Page } from 'src/components/layouts'
import { LoginForm } from 'src/features/User'

export const Login: React.FC = () => {
  return (
    <Page title="Login" center>
      <LoginForm />
    </Page>
  )
}
