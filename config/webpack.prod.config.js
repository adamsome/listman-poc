const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const { APP_INDEX } = require('./paths');

// PROD config - Slower build time focused on fast and minimal bundle
module.exports = require('./webpack.base.config')({
  // In production, we only want to load the polyfills and the app code
  entry: [
    'babel-polyfill',
    APP_INDEX,
  ],
  output: {
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
  },
  // Load CSS files that are imported and export as a single CSS file
  styleLoader: {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1!postcss'),
  },
  // Load the dependency handler plugins and default plugins
  plugins: [
    // Generates an `index.html` file with the <script>'s injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: 'app/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    // This helps ensure the builds are consistent if source hasn't changed:
    new webpack.optimize.OccurrenceOrderPlugin(),
    // Try to dedupe duplicated modules, if any:
    new webpack.optimize.DedupePlugin(),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`
    new ExtractTextPlugin('static/css/[name].[contenthash:8].css'),
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    })
  ],
  babelQuery: {
    // Allows fast rebuilds by `babel-loader` by cahing results
    cacheDirectory: true,
    presets: ['react-hmre'],
  },
  // Don't attempt to continue if there are any errors.
  bail: true,
  // We generate sourcemaps in production; slower but gives good results
  // You can exclude the *.map files from the build during deployment
  devtool: 'source-map',
});
