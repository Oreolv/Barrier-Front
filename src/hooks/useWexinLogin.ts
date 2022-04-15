import { login as TaroLogin } from '@tarojs/taro';
import { login } from '/@/api/mine/users';
import { ShowToast } from '/@/hooks/useShowMessage';
import { LoginResultModel, UserProfile } from '/@/api/mine/model/usersModel';

// 微信小程序目前对获取用户手机号做出限制，个人开发者无法获取。这里暂时随机生成一个手机号。
const randomPhoneNumber = () => {
  const prefixArray = [
    '139',
    '138',
    '137',
    '136',
    '135',
    '134',
    '159',
    '158',
    '157',
    '150',
    '151',
    '152',
    '188',
    '187',
    '182',
    '183',
    '184',
    '178',
    '130',
    '131',
    '132',
    '156',
    '155',
    '186',
    '185',
    '176',
    '133',
    '153',
    '189',
    '180',
    '181',
    '177',
  ];
  const i = Math.floor(Math.random() * prefixArray.length);
  let prefix = prefixArray[i];
  for (let j = 0; j < 8; j++) {
    prefix += Math.floor(Math.random() * 10);
  }
  return prefix;
};

export const useWexinLogin = (profile: UserProfile): Promise<LoginResultModel> => {
  return new Promise((resolve, reject) => {
    TaroLogin({
      success: async (res) => {
        const { code } = res;
        const uphone = randomPhoneNumber();
        if (code) {
          const data = await login({ code, uphone, profile });
          resolve(data);
        } else {
          ShowToast.error('登录失败！' + res.errMsg);
          reject(res.errMsg);
        }
      },
    });
  });
};
