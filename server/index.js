/* exlint consistent-return:0 */
const path = require('path');
const express = require('express');

const addFrontendMiddleWare = require('./frontendMiddleware');

const port = process.env.PORT || 3000;

const app = express();

// If you need a backend, e.g. an API, add your custom
// backend-specific middleware here
// app.use('/api', myApi);

// Add the frontend middleware
const onListenCallback = addFrontendMiddleWare(app, {
  outputPath:    path.resolve(process.cwd(), 'build'),
  publicPath:    '/',
  protocol:      process.env.HTTPS === 'true' ? "https" : "http",
  port:          port,
  host:          process.env.HOST || 'localhost',
  isDev:         process.env.NODE_ENV !== 'production',
  isInteractive: process.stdout.isTTY,
});

// Start the server
app.listen(port, (err) => {
  if (err) {
    return console.log(err.message);
  }

  if (onListenCallback) {
    onListenCallback();
  } else {
    console.log("Server started on port: " + port);
  }
});
