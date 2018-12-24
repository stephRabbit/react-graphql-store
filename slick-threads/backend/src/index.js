const cookieParser = require('cookie-parser')
require('dotenv').config({ path: '.env' })
const createServer = require('./createServer')
const db = require('./db')

const server = createServer()

// Use Express middleware to handle cookies with JWT
// instead of LocalStorage to avoid glitch when passing JWT for SSR
server.express.use(cookieParser())

// TODO :: Use Express middleware populate user

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }
}, details => {
  console.log(`Server is running on port http://localhost:${details.port}`)
})