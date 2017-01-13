var path = require('path');
var fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

// config after eject: we're in ./config/
module.exports = {
  ROOT: appDirectory,
  PACKAGE: resolveApp('package.json'),
  BUILD: resolveApp('build'),
  PUBLIC: resolveApp('public'),
  HTML: resolveApp('app/index.html'),
  APP_INDEX: resolveApp('app/index.js'),
  APP: resolveApp('app'),
  SERVER: resolveApp('server'),
  TEST_SCRIPT: resolveApp('scripts/test.js'),
};


