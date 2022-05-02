const config = {
  development: {
    apiUrl: 'http://192.168.0.233:3001',
  },
  production: {
    apiUrl: 'https://barrier.xinyu.ink/api',
  },
};
const env = process.env.NODE_ENV as string;
export const global = config[env];
