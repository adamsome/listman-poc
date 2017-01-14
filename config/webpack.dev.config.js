const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const { APP_INDEX } = require('./paths');

// DEV config - Focus on DX and fast rebuilds
module.exports = require('./webpack.base.config')({
  // Root imports included in output JS bundle
  entry: [
    // Hot reload JS and CSS
    'webpack-hot-middleware/client',
    // Default polyfills
    'babel-polyfill',
    // App code - Last so that if there is a runtime error during init,
    // it doesn't abort & changing JS code still triggers a refresh
    APP_INDEX,
  ],
  output: {
    // Virtual path served by WebpackDevServer
    // JS bundle w/ code from all entries plus the Webpack runtime
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
  },
  // Load CSS files that are imported
  styleLoader: {
    test: /\.css$/,
    loader: 'style!css?importLoaders=1!postcss'
  },
  // Load the dependency handler plugins and default plugins
  plugins: [
    // Generates an `index.html` file with the <script>'s injected.
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: true,
    }),
    // This is necessary to emit hot updates.
    new webpack.HotModuleReplacementPlugin(),
    // Prevents silent errors from mis-cased import paths
    new CaseSensitivePathsPlugin(),
    // Auto-restart dev server after `npm install`
    new WatchMissingNodeModulesPlugin('node_modules'),
  ],
  babelQuery: {
    // Allows fast rebuilds by `babel-loader` by cahing results
    cacheDirectory: true,
    presets: ['react-hmre'],
  },
  // Use 'eval' instead to see the compiled output in DevTools.
  devtool: 'cheap-module-source-map',
});
