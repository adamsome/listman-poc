/**
 * Application Configuration Values.
 *
 * DO NOT IMPORT THIS INTO YOUR CODE! RATHER USE THE `get` HELPER FUNCTION
 * THAT SITS NEXT TO THIS FILE.
 *
 * e.g.
 *   import getConfig from '../config';
 *   console.log(getConfig('welcomeMessage'));
 *
 * Note: all file/folder paths should be relative to the project root. The
 * absolute paths should be resolved during runtime by our build internal/server.
 */

import * as envVars from './utils/envVars';

const values = {
  // The configuration values that should be exposed to our client bundle.
  // This value gets passed through the /shared/utils/objects/filterWithRules
  // util to create a filter object that can be serialised and included
  // with our client bundle.
  clientConfigFilter: {
    // This is here as an example showing that you can expose variables
    // that were potentially provivded by the environment
    welcomeMessage: true,
    // We only need to expose the enabled flag of the service worker.
    serviceWorker: {
      enabled: true,
    },
    // We need to expose all the polyfill.io settings.
    polyfillIO: true,
    // We need to expose all the htmlPage settings.
    htmlPage: true,
  },

  // The host on which the server should run.
  host: envVars.string('HOST', 'localhost'),

  // The port on which the server should run.
  port: envVars.int('PORT', 1337),

  // The port on which the client bundle development server should run.
  clientDevServerPort: envVars.int('CLIENT_DEV_PORT', 7331),

  // The port on which the API server should run
  apiPort: envVars.int('API_PORT', 1338),

  // This is an example environment variable which is consumed within the
  // './client.js' config.  See there for more details.
  welcomeMessage: envVars.string('WELCOME_MSG', 'Listman!'),

  // Disable server side rendering?
  disableSSR: false,

  // How long should we set the browser cache for the served assets?
  // Don't worry, we add hashes to the files, so if they change the new files
  // will be served to browsers.
  // We are using the "ms" format to set the length.
  // @see https://www.npmjs.com/package/ms
  browserCacheMaxAge: '365d',

  // We use the polyfill.io service which provides the polyfills that a
  // client needs, which is far more optimal than the large output
  // generated by babel-polyfill.
  // Note: we have to keep this seperate from our "htmlPage" configuration
  // as the polyfill needs to be loaded BEFORE any of our other javascript
  // gets parsed.
  polyfillIO: {
    enabled: true,
    // Reference https://qa.polyfill.io/v2/docs/features for a full list
    // of features. We need to register Symbol as this is required by the
    // "transform-react-inline-elements" Babel plugin.
    url: 'https://cdn.polyfill.io/v2/polyfill.min.js?features=Symbol',
  },

  // Configuration for the HTML pages (headers/titles/scripts/css/etc).
  // We make use of react-helmet to consume the values below.
  // @see https://github.com/nfl/react-helmet
  htmlPage: {
    titleTemplate: 'Listman - %s',
    defaultTitle: 'Listman',
    description: 'Listman',
  },

  // Extended configuration for the Content Security Policy (CSP)
  // @see src/server/middleware/security for more info.
  cspExtensions: {
    childSrc: [],
    connectSrc: [],
    defaultSrc: [],
    fontSrc: [],
    imgSrc: [],
    mediaSrc: [],
    manifestSrc: [],
    objectSrc: [],
    scriptSrc: [],
    styleSrc: [],
  },

  // Path to the public assets that will be served off the root of the
  // HTTP server.
  publicAssetsPath: './public',

  // Where does our build output live?
  buildOutputPath: './build',

  // Should we optimize production builds (i.e. minify etc).
  // Sometimes you don't want this to happen to aid in debugging complex
  // problems.  Having this configuration flag here allows you to quickly
  // toggle the feature.
  optimizeProductionBuilds: true,

  // Do you want to included source maps (will be served as seperate files)
  // for production builds?
  includeSourceMapsForProductionBuilds: false,

  // These extensions are tried when resolving src files for our bundles..
  bundleSrcTypes: ['js', 'jsx', 'json'],

  // Additional asset types to be supported for our bundles.
  // i.e. you can import the following file types within your source and the
  // webpack bundling process will bundle them with your source and create
  // URLs for them that can be resolved at runtime.
  bundleAssetTypes: [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'ico',
    'eot',
    'svg',
    'ttf',
    'woff',
    'woff2',
    'otf',
  ],

  // What should we name the json output file that webpack generates
  // containing details of all output files for a bundle?
  bundleAssetsFileName: 'assets.json',

  // node_modules are not included in any bundles that target "node" as a
  // runtime (e.g.. the server bundle) as including them often breaks builds
  // due to thinks like require statements containing expressions..
  // However. some of the modules contain files need to be processed by
  // one of our Webpack loaders (e.g. CSS). Add any file types to the list
  // below to allow them to be processed by Webpack.
  nodeExternalsFileTypeWhitelist: [
    /\.(eot|woff|woff2|ttf|otf)$/,
    /\.(svg|png|jpg|jpeg|gif|ico)$/,
    /\.(mp4|mp3|ogg|swf|webp)$/,
    /\.(css|scss|sass|sss|less)$/,
  ],

  // Note: you can only have a single service worker instance.  Our service
  // worker implementation is bound to the "client" and "server" bundles.
  // It includes the "client" bundle assets, as well as the public folder assets,
  // and it is served by the "server" bundle.
  serviceWorker: {
    // Enabled?
    enabled: true,
    // Service worker name
    fileName: 'sw.js',
    // Paths to the public assets which should be included within our
    // service worker. Relative to our public folder path, and accepts glob
    // syntax.
    includePublicAssets: [
      // NOTE: This will include ALL of our public folder assets.  We do
      // a glob pull of them and then map them to /foo paths as all the
      // public folder assets get served off the root of our application.
      // You may or may not want to be including these assets.  Feel free
      // to remove this or instead include only a very specific set of
      // assets.
      './**/*',
    ],
    // Path to the template used by HtmlWebpackPlugin to generate an offline
    // page that will be used by the service worker to render our application
    // offline.
    offlinePageTemplate: './internal/webpack/offlinePageTemplate.js',
    // Offline page file name.
    offlinePageFileName: 'offline.html',
  },

  bundles: {
    client: {
      // Src entry file.
      srcEntryFile: './client/index.js',

      // Src paths.
      srcPaths: [
        './client',
        './shared',
        // The service worker offline page generation needs access to the
        // config folder.  Don't worry we have guards within the config files
        // to ensure they never get included in a client bundle.
        './config',
      ],

      // Where does the client bundle output live?
      outputPath: './build/client',

      // What is the public http path at which we must serve the bundle from?
      webPath: '/client/',

      // Configuration settings for the development vendor DLL.  This will be created
      // by our development server and provides an improved dev experience
      // by decreasing the number of modules that webpack needs to process
      // for every rebuild of our client bundle.  It by default uses the
      // dependencies configured in package.json however you can customise
      // which of these dependencies are excluded, whilst also being able to
      // specify the inclusion of additional modules below.
      devVendorDLL: {
        // Enabled?
        enabled: true,

        // Specify any dependencies that you would like to include in the
        // Vendor DLL.
        //
        // NOTE: It is also possible that some modules require specific
        // webpack loaders in order to be processed (e.g. CSS/SASS etc).
        // For these cases you don't want to include them in the Vendor DLL.
        include: [
          'react',
          'react-async-component',
          'react-dom',
          'react-helmet',
          'react-jobs',
          'react-onclickoutside',
          'react-redux',
          'react-router',
          'redux',
          'redux-logger',
          'redux-thunk',
        ],

        // The name of the vendor DLL.
        name: '__dev_vendor_dll__',
      },
    },

    server: {
      // Src entry file.
      srcEntryFile: './server/index.js',

      // Src paths.
      srcPaths: [
        './server',
        './shared',
        './config',
      ],

      // Where does the server bundle output live?
      outputPath: './build/server',
    },
  },

  additionalNodeBundles: {
    // NOTE: The webpack configuration and build scripts have been built so
    // that you can add arbitrary additional node bundle configurations here.
    //
    // A common requirement for larger projects is to add additional "node"
    // target bundles (e.g an APi server endpoint). Therefore flexibility has been
    // baked into our webpack config factory to allow for this.
    //
    // Simply define additional configurations similar to below.  The development
    // server will manage starting them up for you.  The only requirement is that
    // within the entry for each bundle you create and return the "express"
    // listener.
    api: {
      srcEntryFile: './server/api/index.js',
      srcPaths: [
        './server/api',
        './config',
      ],
      outputPath: './build/api',
    }
  },

  // These plugin definitions provide you with advanced hooks into customising
  // the project without having to reach into the internals of the tools.
  //
  // We have decided to create this plugin approach so that you can come to
  // a centralised configuration folder to do most of your application
  // configuration adjustments.  Additionally it helps to make merging
  // from the origin starter kit a bit easier.
  plugins: {
    // This plugin allows you to provide final adjustments your babel
    // configurations for each bundle before they get processed.
    //
    // This function will be called once for each for your bundles.  It will be
    // provided the current webpack config, as well as the buildOptions which
    // detail which bundle and mode is being targetted for the current function run.
    babelConfig: (babelConfig, buildOptions) => {
      // eslint-disable-next-line no-unused-vars
      const { target, mode } = buildOptions;

      // Example
      /*
      if (target === 'server' && mode === 'development') {
        babelConfig.presets.push('foo');
      }
     */

      return babelConfig;
    },

    // This plugin allows you to provide final adjustments your webpack
    // configurations for each bundle before they get processed.
    //
    // I would recommend looking at the "webpack-merge" module to help you with
    // merging modifications to each config.
    //
    // This function will be called once for each for your bundles.  It will be
    // provided the current webpack config, as well as the buildOptions which
    // detail which bundle and mode is being targetted for the current function run.
    webpackConfig: (webpackConfig, buildOptions) => {
      // eslint-disable-next-line no-unused-vars
      const { target, mode } = buildOptions;

      // Example:
      /*
      if (target === 'server' && mode === 'development') {
        webpackConfig.plugins.push(new MyCoolWebpackPlugin());
      }
      */

      // Debugging/Logging Example:
      /*
      if (target === 'server') {
        console.log(JSON.stringify(webpackConfig, null, 4));
      }
      */

      return webpackConfig;
    },
  },
};

// This protects us from accidentally including this configuration in our
// client bundle. That would be a big NO NO to do. :)
if (process.env.IS_CLIENT) {
  throw new Error("You shouldn't be importing the `<projectroot>/config` directly into code that will be included in your 'client' bundle as the configuration object will then get included in your client bundle. Not a safe move! Instead, use the `getConfig` helper function located at `<projectroot>/config/get`.");
}

export default values;
