import http from '../util/http';

export const getCovidData = () => http.get('/covid/all_data');
