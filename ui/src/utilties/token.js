const authTokenKey = 'oscillate:authToken';

export const getToken = () => localStorage.getItem(authTokenKey);
