const path = require('path');
const chalk = require('chalk');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const clearConsole = require('react-dev-utils/clearConsole');
const openBrowser = require('react-dev-utils/openBrowser');

const addFrontendMiddleware = (app, cfg) => {
  // Warn and crash if required files are missing
  if (!checkRequiredFiles([path.resolve(process.cwd(), 'app/index.html'),
                           path.resolve(process.cwd(), 'app/index.js')])) {
    process.exit(1);
  }

  // TODO: This is for DEV env, implement PROD
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../config/webpack.dev.config.js');

  const compiler = webpack(webpackConfig);

  // Improves webpack dev server console messaging
  const addConsoleMiddleware = require('./webpackDevConsoleMiddleware');
  addConsoleMiddleware(compiler, cfg);

  const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
    // Use the same public path as the webpack config
    publicPath: webpackConfig.output.publicPath,
    // Only display warnings and errors to the console
    noInfo: true,
    silent: true,
    quiet: true,
    stats: 'errors-only',
  });

  app.use(webpackDevMiddlewareInstance);
  app.use(webpackHotMiddleware(compiler));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = webpackDevMiddlewareInstance.fileSystem;

  app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });

  return () => {
    if (cfg.isInteractive) {
      clearConsole();
    }
    const envStr = cfg.isDev ? "development" : "production";
    console.log(chalk.cyan('Starting the ' + envStr + ' server...'));
    console.log();

    if (cfg.isInteractive) {
      openBrowser(cfg.protocol + '://' + cfg.host + ':' + cfg.port + '/');
    }
  };
};

module.exports = addFrontendMiddleware;
