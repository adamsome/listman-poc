import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'

import { makeMiddleware, renderApp, handleOpenBrowser } from './webpackMiddleware'
import { BUILD, PUBLIC } from '../config/paths'
import Error500 from './templates/Error500'

const app = express()

app.set('etag', true)
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.header('Pragma', 'no-cache')
  res.header('Expires', 0)
  next()
})
// TODO: Add compression
//app.use(compression())
app.enable('view cache')
app.enable('strict routing')

// Add custom React render functions to the express response object
Object.assign(express.response, {
  renderPageToString(page) {
    return `<!doctype html>${renderToString(page)}`
  },
  render500(e) {
    console.log('render-500', e)
    this.status(500).send(this.renderPageToString(<Error500 />))
  },
})

// Render the Error500 page on any errors
app.use((err, req, res, next) => (err) ? res.render500(err) : next())

// TODO: Enable and test
// Serve static assets from the public and compiled build dirs
//const oneDay = 1000 * 60 * 60 * 24
//app.use('/', express.static(BUILD, { maxAge: oneDay }))
//app.use('/', express.static(PUBLIC, { maxAge: oneDay }))

// TODO: Implement API router
//app.use('/api', apiRouter)

// TODO: This is for DEV env, implement PROD
if (process.env.NODE_ENV !== "production") {
  // Add webpack middlewares (dev server and hot reload) in DEV
  app.use(makeMiddleware(require('../config/webpack.dev.config.js')))
}

// TODO: Place before * route, but after hot middleware
// Ensure '/' is appended to requests to ensure routing consistency,
// e.g. /users => /users/
//app.use(slashes())
// TODO: Server-side rendering:
//app.get('*', setRouterContext, renderApp(assets))

app.get('*', renderApp)

// TODO: Should return/export the express app, not launch itself
// TODO: Detect port conflicts (see CRA)
// Start the server & open browser
app.listen(process.env.PORT, handleOpenBrowser)
