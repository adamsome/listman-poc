import express from 'express'
import bodyParser from 'body-parser'
import logger from 'morgan'

import * as listService from './listService'

const app = express()

app.use(logger('dev'))

app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }))

function errorHandler(err, req, res) {
  const e = new Error()
  e.name = err.name
  e.message = err.message
  e.stackd = err.stack
  res.status(err.status || 500).json({ error: e })
  res.end()
}

// TODO Implement action session management
app.use((req, res, next) => {
  const user = { id: 'adamsome' }
  req.user = user
  res.locals.user = user
  next()
})

app.get('/users/:user/lists', (req, res) => {
  listService.getLists(req.params.user)
    .then((result) => res.json(result))
    .catch((e) => res.status(500).send(e))
})

app.post('/users/:user/lists', (req, res) => {
  listService.addList(req.params.user, req.body)
    .then((result) => res.json(result))
    .catch((e) => res.status(500).send(e))
})

app.use('*', (req, res) => {
  const e = new Error()
  e.name = 'APIError'
  e.message = 'API Route Not Found'
  res.status(404).json({ error: e })
  res.end()
})

app.use(errorHandler)

export default app
