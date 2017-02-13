'use strict';

const config = require('config');
const cfenv = require('cfenv');
const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');
const applyMiddleware = require('./middleware');

const env = cfenv.getAppEnv();
const server = applyMiddleware(express());

server.listen(env.port, env.bind, (error) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return;
  }

  // eslint-disable-next-line no-console
  console.log(`Server listening at ${env.url}`);
});
