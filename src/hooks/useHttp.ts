import axios from 'taro-axios';
import Taro from '@tarojs/taro';

const service = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 6000,
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    const { token } = Taro.getStorageSync('userInfo');
    if (token) {
      // 给请求头添加user-token
      config.headers = {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response拦截器
service.interceptors.response.use(
  (res) => {
    return res.data;
  }
  // (error) => {
  //   return Promise.reject(error);
  // }
);

export default service;
