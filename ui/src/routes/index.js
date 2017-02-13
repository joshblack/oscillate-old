import Oscillate from './components/Oscillate';

export const routes = {
  path: '/',
  component: Oscillate,
  childRoutes: [
    require('./EntryRoute'),
    {
      path: '*',
      getComponent(location, callback) {
        import('./components/NotFound')
          .then(({ default: NotFound }) => callback(null, NotFound))
          .catch(callback);
      },
    },
  ],
};
