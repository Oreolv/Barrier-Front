import Taro from '@tarojs/taro';
import { login } from '/@/api/users';
import { ShowToast } from '/@/hooks/useShowMessage';
import { LoginResultModel, UserProfile } from '/@/api/model/usersModel';

export const useWexinLogin = (profile: UserProfile): Promise<LoginResultModel> => {
  return new Promise((resolve, reject) => {
    Taro.login({
      success: async (res) => {
        const { code } = res;
        if (code) {
          const data = await login({ profile, code });
          resolve(data);
        } else {
          ShowToast.error('登录失败！' + res.errMsg);
          reject(res.errMsg);
        }
      },
    });
  });
};
