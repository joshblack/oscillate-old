/**
 * Simple utility to parse a rawQuery provided from `window.location.search`.
 */
export const parse = (rawQuery) => {
  const rawParams = rawQuery.slice(1).split('&').filter((p) => !!p);
  const decodedParams = rawParams.map((param) => {
    const [key, value] = param.split('=');

    return [decodeURIComponent(key), decodeURIComponent(value)];
  });

  return decodedParams.reduce((acc, [key, value]) => ({
    ...acc,
    [key]: value,
  }), {});
};
