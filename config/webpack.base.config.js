const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

const setEnvDefault = require('./env');
const { BUILD, APP } = require('./paths');

const publicPath = '/';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';
// Get environment variables to inject into our app.
setEnvDefault('PUBLIC_URL', publicUrl);

// This is the baseline configuration.
// Called by the dev and prod configurations to get baseline defaults.
module.exports = (options) => ({
  // Just use the environment-specific settings
  entry: options.entry,

  // Merge with environment-specific settings
  output: Object.assign({
    path: BUILD,
    // URL that app is served from ('/' in dev for ease of use)
    publicPath: publicPath,
  }, options.output),

  module: {
    // First, run the linter.
    // It's important to do this before Babel processes the JS.
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
        include: APP,
      }
    ],
    loaders: [
      // Default loader: load all assets that are not handled
      // by other loaders with the url loader.
      // Note: This list needs to be updated with every change of extensions
      // the other loaders match.
      // E.g., when adding a loader for a new supported file extension,
      // we need to add the supported extension to this loader too.
      // Add one new line in `exclude` for each loader.
      //
      // "file" loader makes sure those assets get served by WebpackDevServer.
      // When you `import` an asset, you get its (virtual) filename.
      // In production, they would get copied to the `build` folder.
      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      // A missing `test` is equivalent to a match.
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
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
      // Process JS with Babel.
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: options.babelQuery,
      },
      // Load CSS files that are imported
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1!postcss'),
      },
      // Optimate web images
      {
        test: /\.(jpg|png|gif)$/,
        loaders: [
          'file-loader',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
        ],
      },
      // JSON is not enabled by default in Webpack but both Node and Browserify
      // allow it implicitly so we also enable it.
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
    new ExtractTextPlugin('[name].css'),
    // Consolidate vendor JS libraries into its own JS file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2,
      async: true,
    }),
    // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    new InterpolateHtmlPlugin({
      PUBLIC_URL: publicUrl
    }),
    new webpack.ProvidePlugin({
      // Enable fetch
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
