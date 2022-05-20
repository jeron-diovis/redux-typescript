import { HOST, PORT } from './const'
import { setupServer } from './server'

const server = setupServer()

server.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`JSON Server is running at ${HOST}:${PORT}`)
})
