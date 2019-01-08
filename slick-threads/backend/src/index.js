const cookieParser = require('cookie-parser')
require('dotenv').config({ path: '.env' })
const createServer = require('./createServer')
const db = require('./db')
const jwt = require('jsonwebtoken')

const server = createServer()

// Use Express middleware to handle cookies with JWT
// instead of LocalStorage to avoid glitch when passing JWT for SSR
server.express.use(cookieParser())

// Decode JWT to get user Id on every request
server.express.use((req, res, next) => {
  const { token } = req.cookies

  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    // Add userId to request
    req.userId = userId
  }
  next()
})

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }
}, details => {
  console.log(`Server is running on port http://localhost:${details.port}`)
})