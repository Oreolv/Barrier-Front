import http from '/@/utils/http';

export const loginApi = (code) => http.post('/resident/login', { code });
