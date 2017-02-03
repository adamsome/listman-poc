import express from 'express'
import bodyParser from 'body-parser'
import logger from 'morgan'

import db from './db'
import { makeMethods, handleError } from './requestUtil'

const app = express()

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

const { get, post } = makeMethods(app)

get('/users/:user', req => db.users.find(req.params.user))

get('/users/:username/lists', req => db.lists.byUser(req.params.username))

post('/users/:user/lists', req => db.lists.add(req.params.user, req.body))

app.use('*', (req, res) => handleError({
  name: 'APIError',
  message: 'API route not found',
  status: 404
}))

app.use(handleError)

export default app
