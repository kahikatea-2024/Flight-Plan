import express from 'express'
import * as Path from 'node:path'
import userRoutes from './routes/users.ts'
import eventRoutes from './routes/events.ts'
import tripRoutes from './routes/trips.ts'
import followerRoutes from './routes/followers.ts'
const server = express()

server.use(express.json())

server.use('/api/v1/users', userRoutes)
server.use('/api/v1/events', eventRoutes)
server.use('/api/v1/trips', tripRoutes)
server.use('/api/v1/friends', followerRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
