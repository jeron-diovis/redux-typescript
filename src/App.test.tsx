import React from 'react'

import { render } from '@testing-library/react'

import App from './App'

test('renders greeting', () => {
  const { getByText } = render(<App />)

  expect(getByText(/Hello and welcome/i)).toBeInTheDocument()
})
