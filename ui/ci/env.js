'use strict';

/**
 * Grab NODE_ENV and OSCILLATE_APP_* environment variables and prepare them to be
 * injected into the application via DefinePlugin in Webpack configuration.*
 */

const OSCILLATE_APP = /^OSCILLATE_APP_/i;

function getClientEnvironment() {
  const initialConfig = {
    'NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development'
    ),
  };

  const processEnv = Object.keys(process.env)
    .filter((key) => OSCILLATE_APP.test(key))
    .reduce((env, key) => {
      return Object.assign({}, env, {
        [key]: JSON.stringify(process.env[key]),
      });
    }, initialConfig);

  return {
    'process.env': processEnv,
    '__DEV__': JSON.stringify(
      process.env.NODE_ENV !== 'production'
    ),
  };
}

module.exports = getClientEnvironment;
