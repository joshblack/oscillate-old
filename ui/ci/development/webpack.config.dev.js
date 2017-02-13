'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const getClientEnvironment = require('../env');
const paths = require('../paths');

const env = getClientEnvironment();

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // HMR for React
    'react-hot-loader/patch',

    // Include an alternative client for WebpackDevServer. A client's job is to
    // connect to WebpackDevServer by a socket and get notified about changes.
    // When you save a file, the client will either apply hot updates (in case
    // of CSS changes), or refresh the page (in case of JS changes). When you
    // make a syntax error, this client will display a syntax error overlay.
    // Note: instead of the default WebpackDevServer client, we use a custom one
    // to bring better experience for Create React App users. You can replace
    // the line below with these two lines if you prefer the stock client:
    // require.resolve('webpack-dev-server/client') + '?/',
    // require.resolve('webpack/hot/dev-server'),
    require.resolve('react-dev-utils/webpackHotDevClient'),

    // Necessary for hot reloading with IE
    'eventsource-polyfill',

    paths.entry,
  ],
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.build,

    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,

    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'static/js/bundle.js',

    // This is the URL that app is served from. We use '/' in development.
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: paths.src,
        options: {
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          presets: [
            ['es2015', { modules: false }],
            'stage-2',
            'react',
            'flow',
          ],
          plugins: [
            'react-hot-loader/babel',
            paths.babelRelayPlugin,
          ],
        },
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            query: {
              sourceMap: true,
              minimize: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            query: {
              sourceMap: true,
            },
          },
          {
            loader: 'resolve-url-loader',
            query: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            query: {
              sourceMap: true,
              sourceMapContents: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        output: {
          path: paths.build,
        },
        postcss: [
          require('autoprefixer')({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
          }),
        ],
      },
    }),

    // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.: <link rel='shortcut icon' href='%PUBLIC_URL%/favicon.ico'>
    // In production, it will be an empty string unless you specify 'homepage'
    // in `package.json`, in which case it will be the pathname of that URL.
    new InterpolateHtmlPlugin({
      PUBLIC_URL: '',
      TITLE: 'Stardust Dev',
    }),

    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.html,
    }),

    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
    new webpack.DefinePlugin(env),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
