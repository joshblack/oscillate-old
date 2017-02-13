import './polyfills';

import React from 'react';
import Relay from 'react-relay';
import ReactDOM, { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { match, Router, browserHistory, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import { routes } from './routes';
import { getToken } from './utilties/token';

import './styles/styles.scss';

if (__DEV__) {
  // Capture a11y information from the rendered DOM
  const axe = require('react-axe');

  axe(React, ReactDOM, 1000);
}

const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;

const mountNode = document.getElementById('root');

render(
  <AppContainer>
    <Router
      routes={routes}
      history={browserHistory}
      render={applyRouterMiddleware(useRelay)}
      environment={Relay.Store}
    />
  </AppContainer>,
  mountNode
);

// if (module.hot) {
  // module.hot.accept('./routes', () => {
    // const nextRoutes = require('./routes');

    // render(
      // <AppContainer>
        // <Router
          // routes={nextRoutes}
          // history={browserHistory}
          // render={applyRouterMiddleware(useRelay)}
          // environment={Relay.Store}
        // />
      // </AppContainer>,
      // mountNode
    // );
  // });
// }
