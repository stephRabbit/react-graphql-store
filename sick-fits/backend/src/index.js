require('dotenv').config({ path: '.env' })
const createServer = require('./createServer')
const db = require('./db')

const server = createServer()

// TODO ::
// handle cookies (JWT) and populate user
// with Express middleware

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }
}, details => {
  console.log(`Server is running on port http://localhost:${details.port}`)
})