import { render } from '@testing-library/react'

import App from './App'

it('should work', () => {
  expect(App).toBeDefined() // jest assert
  expect(App).to.be.instanceof(Function) // Chai assert

  const { getByText } = render(<App />)
  expect(getByText(/Vite \+ React/i)).toBeInTheDocument() // jest-dom extended assert
})
