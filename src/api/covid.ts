import http from '/@/utils/http';

export const getCovidData = () => http.get('/covid/all_data');
