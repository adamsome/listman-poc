/* exlint consistent-return:0 */
import express from 'express'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import checkRequiredFiles from 'react-dev-utils/checkRequiredFiles'

import { createWebpackMiddlewares, printServerStarting, memFS, outputPath } from './webpackHelper'
import { BUILD, PUBLIC } from '../config/paths'
import Error500 from './templates/Error500'

const PORT = process.env.PORT
const oneDay = 1000 * 60 * 60 * 24;

// Warn and crash if required files are missing
if (!checkRequiredFiles([path.resolve(process.cwd(), 'app/index.js')])) {
  process.exit(1);
}

// TODO: Implement PROD server
const app = express();

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
//app.use('/', express.static(BUILD, { maxAge: oneDay }))
//app.use('/', express.static(PUBLIC, { maxAge: oneDay }))

// TODO: Implement API router
//app.use('/api', apiRouter)

// TODO: This is for DEV env, implement PROD
if (process.env.NODE_ENV !== "production") {
  // Add webpack middlewares (dev server and hot reload) in DEV
  const webpackConfig = require('../config/webpack.dev.config.js');
  const middlewares = createWebpackMiddlewares(webpackConfig)
  app.use(middlewares.dev)
  app.use(middlewares.hmr)
}

// Since webpackDevMiddleware uses memory-fs internally to store build
// artifacts, we use it instead
const fs = memFS

// TODO: Place before * route, but after hot middleware
// Ensure '/' is appended to requests to ensure routing consistency,
// e.g. /users => /users/
//app.use(slashes())
//app.get('*', setRouterContext, renderApp(assets))

app.get('*', (req, res) => {
  fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(file.toString());
    }
  });
});

// TODO: Should return/export the express app, not launch itself
// TODO: Detect port conflicts (see CRA)
// Start the server
app.listen(PORT, (err) => {
  if (err) {
    return console.log(err.message);
  }
  printServerStarting()
});
