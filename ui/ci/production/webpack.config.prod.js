'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const getClientEnvironment = require('../env');
const paths = require('../paths');

const env = getClientEnvironment();
const BUILD_PATH = path.resolve(__dirname, '../build');

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

module.exports = {
  bail: true,
  devtool: 'source-map',
  entry: {
    main: [
      'react-hot-loader/patch',
      paths.entry,
    ],
    // Split out external dependencies into own bundle.
    // This should not change as frequently as product code.
    vendor: [
      'classnames',
      'es6-promise',
      'history',
      'react',
      'react-dom',
      'react-router',
      'whatwg-fetch',
    ],
  },
  output: {
    path: paths.build,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[id].[chunkhash:8].chunk.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: paths.src,
        options: {
          presets: [
            ['es2015', { modules: false }],
            'stage-2',
            'react',
            'flow',
            'react-optimize',
          ],
          plugins: [
            'react-hot-loader/babel',
            paths.babelRelayPlugin,
          ],
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
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
        }),
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:8].[ext]'
        },
      },
    ],
  },
  plugins: [
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
            ]
          }),
        ],
      },
    }),

    // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In production, it will be an empty string unless you specify "homepage"
    // in `package.json`, in which case it will be the pathname of that URL.
    new InterpolateHtmlPlugin({
      PUBLIC_URL: '',
      TITLE: 'Stardust',
    }),

    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.html,
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

    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV was set to production here.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin(env),

    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compressor: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),

    // Extract out common dependencies into a standalone chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'static/js/[name].[chunkhash:8].js',
    }),

    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      disable: false,
      allChunks: true,
    }),

    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    })
  ],
};
