import Taro from '@tarojs/taro';
import { login } from '/@/api/users';
import { ShowToast } from '/@/hooks/useShowMessage';

export const useWexinLogin = () => {
  return new Promise((resolve, reject) => {
    Taro.login({
      success: async (res) => {
        const { code } = res;
        if (code) {
          const data = await login({ code });
          resolve(data);
        } else {
          ShowToast.error('登录失败！' + res.errMsg);
          reject(res.errMsg);
        }
      },
    });
  });
};
