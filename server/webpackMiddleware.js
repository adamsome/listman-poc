import chalk from 'chalk'
import path from 'path'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import openBrowser from 'react-dev-utils/openBrowser'
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages'
import clearConsole from 'react-dev-utils/clearConsole'

const isTTY = process.stdout.isTTY
const protocol = process.env.HTTPS === 'true' ? "https" : "http"
const host = process.env.HOST || 'localhost'

function addCustomCompilerMessages(compiler) {
  // "invalid" event fires when you have changed a file, and Webpack is
  // recompiling a bundle. WebpackDevServer takes care to pause serving the
  // bundle, so if you refresh, it'll wait instead of serving the old one.
  // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
  compiler.plugin('invalid', function() {
    if (isTTY) {
      clearConsole();
    }
    console.log('Compiling...');
  });

  var isFirstCompile = true;

  // "done" event fires when Webpack has finished recompiling the bundle.
  // Whether or not you have warnings or errors, you will get this event.
  compiler.plugin('done', function(stats) {
    if (isTTY) {
      clearConsole();
    }

    // We have switched off the default Webpack output in WebpackDevServer
    // options so we are going to "massage" the warnings and errors and
    // present them in a readable focused way.
    var messages = formatWebpackMessages(stats.toJson({}, true));
    var isSuccessful = !messages.errors.length && !messages.warnings.length;
    var showInstructions = isSuccessful &&
                           (isTTY || isFirstCompile);

    if (isSuccessful) {
      console.log(chalk.green('Compiled successfully!'));
    }

    if (showInstructions) {
      console.log();
      console.log('The app is running at:');
      console.log();
      console.log('  ' + chalk.cyan(protocol + '://' +
                                    host + ':' +
                                    process.env.PORT + '/'));
      console.log();

      if (process.env.NODE_ENV !== 'production') {
        console.log('Note that the development build is not optimized.');
        console.log('To create a production build, use ' +
                    chalk.cyan('npm run build') + '.');
        console.log();
      }
      isFirstCompile = false;
    }

    // If errors exist, only show errors.
    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.'));
      console.log();
      messages.errors.forEach(message => {
        console.log(message);
        console.log();
      });
      return;
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.'));
      console.log();
      messages.warnings.forEach(message => {
        console.log(message);
        console.log();
      });
      // Teach some ESLint tricks.
      console.log('You may use special comments to disable some warnings.');
      console.log('Use ' + chalk.yellow('// eslint-disable-next-line') + ' to ignore the next line.');
      console.log('Use ' + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a file.');
    }
  });
}

const makeCompiler = (config) => {
  // "Compiler" is a low-level interface to Webpack.
  // It lets us listen to some events and provide our own custom messages.
  const compiler = webpack(config)
  addCustomCompilerMessages(compiler)

  return compiler
}

// `makeMiddleware` sets outputPath & webpack fileSystem used by `renderApp`
let outputPath
let fileSystem

const makeMiddleware = (config, compiler) => {
  if (!compiler) compiler = makeCompiler(config)

  let middleware = []
  middleware.push(webpackDevMiddleware(compiler, {
    // Use the same public path as the webpack config
    publicPath: config.output.publicPath,
    // Only display warnings and errors to the console
    noInfo: true,
    silent: true,
    quiet: true,
    stats: 'errors-only',
  }))
  middleware.push(webpackHotMiddleware(compiler))

  outputPath = compiler.outputPath
  fileSystem = middleware[0].fileSystem

  return middleware
}

const renderApp = (req, res) => {
  if (!fileSystem) {
    throw Error('makeMiddleware must be called before renderApp')
  }
  fileSystem.readFile(path.join(outputPath, 'index.html'), (err, file) => {
    if (err) {
      res.sendStatus(404)
    } else {
      res.send(file.toString())
    }
  })
}

const handleOpenBrowser = (err) => {
  if (err) {
    return console.log(err.message)
  }
  if (isTTY) {
    clearConsole()
  }
  console.log(chalk.cyan(
    'Starting the ' + process.env.NODE_ENV + ' server...'
  ))
  console.log()
  if (isTTY) {
    openBrowser(protocol + '://' + host + ':' + process.env.PORT + '/')
  }
}

export { makeCompiler, makeMiddleware, renderApp, handleOpenBrowser }
