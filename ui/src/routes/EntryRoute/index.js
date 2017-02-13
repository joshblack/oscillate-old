import ViewerQueries from './queries/ViewerQueries';

module.exports = {
  path: 'entry',
  queries: ViewerQueries,
  getComponent(location, callback) {
    import('./components/Entry')
      .then(({ default: Entry }) => callback(null, Entry))
      .catch((error) => console.error(error));
  }
};
