'use strict';

const compression = require('compression');
const config = require('config');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const path = require('path');

const ASSET_PATH = path.resolve(__dirname, '../../../build');
const STATIC_PATH = path.join(ASSET_PATH, 'static');

function applyMiddleware(server) {
  server.disable('x-powered-by');

  // Logging middleware
  server.use(morgan('dev'));

  // GZIP middleware
  server.use(compression());

  // Protect against HTTP Parameter Pollution attacks
  server.use(hpp());

  // Secure server by setting various HTTP headers
  server.use(helmet.xssFilter());
  server.use(helmet.frameguard('deny'));
  server.use(helmet.ieNoOpen());
  server.use(helmet.noSniff());

  // Serve our build assets with an aggressive cache policy duration
  server.use(
    '/static',
    express.static(STATIC_PATH, { maxAge: 31536000000 })
  );

  // server.get('/favicon.ico', (req, res) => {
    // res.sendFile(path.resolve(ASSET_PATH, 'favicon.ico'));
  // });

  server.get('/', (req, res) => {
    res.sendFile(path.resolve(ASSET_PATH, 'index.html'));
  });

  return server;
}

module.exports = applyMiddleware;
