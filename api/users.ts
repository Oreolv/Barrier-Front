import http from '../util/http';

export const loginApi = (code) => http.post('/users/login', { code });
