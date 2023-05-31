import express from 'express'
import { join } from 'node:path'

import fruitRoutes from './routes/fruits'
import birdRoutes from './routes/birds'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/fruits', fruitRoutes)
server.use('/api/v1/birds', birdRoutes)

server.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public/index.html'))
})

export default server
