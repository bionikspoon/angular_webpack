/* eslint default-case:0, angular/json-functions:0 */
require('babel-polyfill');

const _ = require('lodash');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const unipath = require('unipath');
const postcssImport = require('postcss-import');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

// ===========================================================================
// CONSTANTS
// ===========================================================================
const PATHS = {
  src: unipath('client'),
  app: unipath('client', 'app'),
  dist: unipath('dist'),
  modules: unipath('node_modules'),
  base: unipath(),
};
const DEVELOPMENT = 'development';
const PRODUCTION = 'production';
const TEST = 'test';
const LOADER_INCLUDES = [ PATHS.src() ];
const HOST = 'localhost';
const PORT = 3000;
// ===========================================================================
// SETUP ENV
// ===========================================================================
const ENV = getEnv(process.env.npm_lifecycle_event);
const ENV_IS = {
  DEVELOPMENT: ENV === DEVELOPMENT,
  PRODUCTION: ENV === PRODUCTION,
  TEST: ENV === TEST,
};
const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');
const WATCH = ENV_IS.DEVELOPMENT || process.argv.includes('--auto-watch');

// ===========================================================================
// CONFIG EXPORT
// ===========================================================================
module.exports = {
  entry: getEntry(ENV),

  output: {
    path: PATHS.dist(),
    publicPath: '/',
    filename: DEBUG ? '[name].js?[hash]' : '[name].[chunkhash].js',
    chunkFilename: DEBUG ? '[name].js?[chunkhash]' : '[name].[chunkhash].js',
    sourceMapFilename: '[file].map',
    sourcePrefix: '  ',
  },

  module: {
    preLoaders: getPreLoaders(ENV),
    loaders: getLoaders(ENV),
  },

  plugins: getPlugins(ENV),

  resolve: { extensions: [ '', '.js' ] },
  devtool: ENV_IS.PRODUCTION ? 'source-map' : 'inline-source-map',
  postcss: getPostcss,
  cache: DEBUG,
  debug: DEBUG,
  target: 'web',
  progress: true,
  watch: ENV_IS.DEVELOPMENT || WATCH,
  noInfo: !VERBOSE,
  stats: getStatOptions(),
  PATHS,
};

// ===========================================================================
// CONFIG ENV DEFINITIONS
// ===========================================================================
function getEntry(env) {
  const entry = {};
  entry.main = [];
  entry.vendor = [];
  switch (env) {
    case DEVELOPMENT:
      // enforce order
      entry.main.push(PATHS.src('app.bootstrap.js'));
      entry.main.push(`webpack-hot-middleware/client?http://${HOST}:${PORT}`);
      entry.main.push('webpack/hot/only-dev-server');
      break;

    case PRODUCTION:
      entry.vendor.push(...Object.keys(require('./package.json').dependencies));

      entry.main.push(PATHS.src('app.bootstrap.js'));
      break;

    case TEST:
      break;
  }

  return entry;
}

function getPreLoaders(env) {
  const preLoaders = [
    { test: /\.js$/, include: LOADER_INCLUDES, loader: 'baggage?[dir].html&[dir].scss' },
  ];

  switch (env) {
    case DEVELOPMENT:
      preLoaders.push(
        { test: /\.js$/, include: LOADER_INCLUDES, loaders: [ 'eslint' ] }
      );
      break;

    case PRODUCTION:
      preLoaders.push(
        { test: /\.js$/, include: LOADER_INCLUDES, loaders: [ 'eslint' ] }
      );
      break;

    case TEST:
      preLoaders.push(
        { test: /\.js/, include: LOADER_INCLUDES, loader: 'babel-istanbul' }
      );
      break;
  }
  return preLoaders;
}

function getLoaders(env) {
  const SASS_LOADER = { test: /\.s?css$/, includes: LOADER_INCLUDES };
  const loaders = [
    { test: /\.js$/, loader: 'babel?cacheDirectory', include: LOADER_INCLUDES },
    {
      test: /\.html$/,
      // loader: 'file?name=[name].[hash:5].[ext]',
      loader: `ngtemplate?relativeTo=${PATHS.src()}!html?interpolate`,
      include: LOADER_INCLUDES,
    },
    { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, loader: 'file' },
  ];
  switch (env) {
    case DEVELOPMENT:
      loaders.push(_.merge(SASS_LOADER, {
        loaders: [
          'style?sourceMap',
          'css?sourceMap',
          'postcss?sourceMap',
          'sass?sourceMap',
        ],
      }));
      break;

    case PRODUCTION:
      loaders.unshift({ test: /\.js$/, loader: 'ng-annotate', include: LOADER_INCLUDES });
      loaders.push(_.merge(SASS_LOADER, {
        loader: ExtractTextPlugin.extract(''
          + 'css?minimize&sourceMap'
          + '!'
          + 'postcss?sourceMap'
          + '!'
          + 'sass?sourceMap'
        ),
      }));
      break;

    case TEST:
      loaders.push(_.merge(SASS_LOADER, { loader: 'null' }));
      break;
  }

  return loaders;
}

function getPlugins(env) {
  const plugins = [
    new HtmlPlugin({
      inject: false,
      template: PATHS.src('index.ejs'),
      filename: 'index.html',
      title: 'Angular Webpack',
      mobile: true,
      unsupportedBrowser: true,
      appMountDirective: 'app-core',
      baseHref: ENV_IS.PRODUCTION ? '/' : `http://${HOST}:${PORT}/`,
      minify: DEBUG ? false : getHtmlMinifyOptions(),
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
      __PRODUCTION__: JSON.stringify(ENV_IS.PRODUCTION),
    }),
  ];

  switch (env) {
    case DEVELOPMENT:
      plugins.push(new NpmInstallPlugin({ saveDev: true }));
      plugins.push(new webpack.HotModuleReplacementPlugin());
      plugins.push(new webpack.NoErrorsPlugin());
      break;

    case PRODUCTION:
      if (!DEBUG) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
      }
      plugins.push(
        new ExtractTextPlugin(DEBUG ? 'main.css?[chunkhash]' : 'main.[chunkhash].css')
      );
      // // create chunks for pages
      // plugins.push(
      //   new webpack.optimize.CommonsChunkPlugin({
      //     names: [
      //       './client/app/pages/about', './client/app/pages/home',
      //     ],
      //   })
      // );
      plugins.push(new webpack.optimize.AggressiveMergingPlugin());
      plugins.push(
        new webpack.optimize.CommonsChunkPlugin({ names: [ 'vendor', 'manifest' ] })
      );
      plugins.push(new webpack.optimize.DedupePlugin());
      break;

    case TEST:
      plugins.push(new NpmInstallPlugin({ saveDev: true }));
      break;
  }
  return plugins;
}

function getPostcss(bundler) {
  return [
    postcssImport({ addDependencyTo: bundler }),
    precss(),
    autoprefixer({ browsers: [ 'last 2 versions' ] }),
  ];
}

function getHtmlMinifyOptions() {
  return {
    removeComments: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    collapseInlineTagWhitespace: true,
    collapseBooleanAttributes: true,
    removeTagWhitespace: true,
    removeAttributeQuotes: true,
    useShortDoctype: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    caseSensitive: true,
  };
}

function getStatOptions() {
  return {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
    children: VERBOSE,
  };
}

// ===========================================================================
// UTILS
// ===========================================================================
function getEnv(target) {
  if (global.test === true) { return TEST; }

  switch (target) {
    case 'test':
      return TEST;
    case 'start':
      return DEVELOPMENT;
    case 'build':
      return PRODUCTION;
    case 'stats':
      return PRODUCTION;
    case 'gulp':
      return DEVELOPMENT;
    default:
      throw Error('Unknown target!  Use `npm run script`', target);
  }
}
