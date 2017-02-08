/* eslint-disable no-console */

import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import logger from 'morgan'

import router from './middleware/router'
import security from './middleware/security'
import errorHandlers from './middleware/errorHandlers'
import clientOrigin from './middleware/clientOrigin'
import getConfig from '../../config/get'

// Create our express based server.
const app = express()

// Don't expose any software information to potential hackers.
app.disable('x-powered-by')

// Security middlewares.
app.use(...security)

// Allow client server to access
app.use(clientOrigin)

// Gzip compress the responses.
app.use(compression())

app.use(logger('dev'))

app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }))

// TODO Implement action session management
app.use((req, res, next) => {
  const user = { id: 'adamsome' }
  req.user = user
  res.locals.user = user
  next()
})

// Handle API routes
app.use('/api/v1', router)

// Error Handler middlewares.
app.use(...errorHandlers)

// Create an http listener for our express app.
const port = getConfig('apiPort')
const listener = app.listen(port, 'localhost', () =>
  console.log(`API listening on port ${port}`),
)

// We export the listener as it will be handy for our development hot reloader,
// or for exposing a general extension layer for application customisations.
export default listener

