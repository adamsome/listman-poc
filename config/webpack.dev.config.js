const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
module.exports = require('./webpack.base.config')({
  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  entry: [
    // Hot reload JS and CSS
    'webpack-hot-middleware/client',
    // Default polyfills
    'babel-polyfill',
    // Finally, this is your app's code:
    path.join(process.cwd(), 'app/index.js'),
    // We include the app code last so that if there is a runtime
    // error during initialization, it doesn't blow up the client, and
    // changing JS code would still trigger a refresh.
  ],
  output: {
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
  },
  // The style/CSS loaders are different in dev vs. prod.
  styleLoaders: [{
    test: /\.css$/,
    loader: 'style!css?importLoaders=1!postcss'
  }],
  // Load the dependency handler plugins and default plugins
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: true,
    }),
    // This is necessary to emit hot updates.
    new webpack.HotModuleReplacementPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin('node_modules'),
  ],
  babelQuery: {
    // This is a feature of `babel-loader` for webpack (not Babel itself).
    // It enables caching results in ./node_modules/.cache/babel-loader/
    // directory for faster rebuilds.
    cacheDirectory: true,
    presets: ['react-hmre'],
  },
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  devtool: 'cheap-module-source-map',
});
