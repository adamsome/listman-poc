const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const setEnvDefault = require('./env');
const { BUILD, APP } = require('./paths');

const publicPath = '/';

// Baseline config - Environment-specific configs call to get defaults
module.exports = (options) => ({
  // Just use the environment-specific settings
  entry: options.entry,
  // Merge with environment-specific settings
  output: Object.assign({
    path: BUILD,
    publicPath: publicPath,
  }, options.output),

  module: {
    // Run the linter before Babel processes the JS
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
        include: APP,
      }
    ],
    loaders: [
      // Default loader: Use URL loader for all assets not handled by others
      // N.B.: Update with every extension change of other loaders
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.(css)|(scss)$/,
          /\.(jpg|png|gif)$/,
          /\.json$/,
          /\.(eot|svg|ttf|woff|woff2)$/
        ],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      // Process JS with Babel
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: options.babelQuery,
      },
      // Use the style loader in the environment-specific options
      options.styleLoader,
      // Optimate web images
      {
        test: /\.(jpg|png|gif)$/,
        loaders: [
          'file-loader',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
        ],
      },
      // Enable JSON importing
      {
        test: /\.json$/,
        loader: 'json'
      },
      // "file" loader for svg
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ],
  },
  // We use PostCSS for autoprefixing only.
  postcss: function() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ]
      }),
    ];
  },
  plugins: options.plugins.concat([
    // Consolidate vendor JS libraries into its own JS file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2,
      async: true,
    }),
    new webpack.ProvidePlugin({
      // Enable fetch
      // TODO: Remove if using axios
      fetch: 'exports?self.fetch!whatwg-fetch',
    }),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
    new webpack.DefinePlugin({
      'process.env': {
        PORT: JSON.stringify(process.env.PORT),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.NamedModulesPlugin(),
  ]),
  resolve: {
    modules: ['app', 'node_modules'],
    // These are the reasonable defaults supported by the Node ecosystem.
    extensions: ['.js', '.json', '.jsx', '.react.js', '',],
  },
  // Just use the environment-specific settings
  devtool: options.devtool,
  // Make web variables accessible to webpack, e.g. window
  target: 'web',
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
});
