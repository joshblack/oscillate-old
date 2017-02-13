import { parse } from '../query';

describe('Query Utility', () => {
  describe('#parse', () => {
    it('should return an empty object with no query params', () => {
      expect(parse('')).toEqual({});
    });

    it('should return a single key,value pair with a single query param', () => {
      expect(parse('?foo=bar')).toEqual({ foo: 'bar' });
    });

    it('should return a complete object with multiple query params', () => {
      const queryString = '?foo=bar&baz=foobar';

      expect(parse(queryString)).toEqual({
        foo: 'bar',
        baz: 'foobar',
      });
    });
  });
});
