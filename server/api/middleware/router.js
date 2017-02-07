import express from 'express'

import db from '../db'
import { makeMethods, handleError } from './routerUtil'

const app = express()

const { get, post } = makeMethods(app)

get('/users/:username', req => db.users.find(req.params.username))

get('/users/:username/lists', req => db.lists.byUser(req.params.username))

post('/users/:username/lists', req => db.lists.add(req.params.username, req.body))

app.use('*', (req, res) => handleError({
  name: 'APIError',
  message: 'API route not found',
  status: 404
}))

app.use(handleError)

export default app

