import { routes } from '../';

describe('Routes config', () => {
  it('should have a root path with a root component', () => {
    expect(routes.path).toBe('/');
    expect(routes.component).toBeDefined();
  });

  it('should specify a 404 (NotFound) route when the client route does not match', async () => {
    const NotFoundRoute = routes.childRoutes[routes.childRoutes.length - 1];

    expect(NotFoundRoute).toBeDefined();
    expect(NotFoundRoute.path).toBe('*');

    const cb = jest.fn();

    await NotFoundRoute.getComponent('', cb);

    expect(cb).toHaveBeenCalled();
    expect(cb).toHaveBeenCalledWith(null, require('../components/NotFound').default);
  });
});
