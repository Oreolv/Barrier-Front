import Taro from '@tarojs/taro';
import { loginApi } from '/@/api/users';
import { SuccessToast, ErrorToast } from '/@/hooks/useShowToast';

export const useWexinLogin = () => {
  return new Promise((resolve, reject) => {
    Taro.login({
      success: async (res) => {
        const { code } = res;
        if (code) {
          const { result, errcode, message } = await loginApi(code);
          errcode === 0 ? SuccessToast('登陆成功') : ErrorToast(message);
          resolve(result);
        } else {
          ErrorToast('登录失败！' + res.errMsg);
          reject(res.errMsg);
        }
      },
    });
  });
};
