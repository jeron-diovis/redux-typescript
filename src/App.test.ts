import App from './App'

it('should work', () => {
  expect(App).toBeDefined() // jest assert
  expect(App).to.be.instanceof(Function) // Chai assert
})
