import Taro from '@tarojs/taro';
import { UserInfoProp } from '/@/model/user';
import { ShowToast } from '/@/hooks/useShowMessage';
export const useWexinProfile = (): Promise<UserInfoProp> => {
  return new Promise((resolve, reject) => {
    Taro.getUserProfile({
      desc: '用于登陆、完善会员资料',
      success: (res) => {
        const userInfo = res.userInfo;
        const result = {
          avatar: userInfo.avatarUrl,
          nickName: userInfo.nickName,
        };
        resolve(result);
      },
      fail: (res) => {
        if (res.errMsg.search(/fail auth deny/)) {
          ShowToast.error('用户取消登陆');
        } else {
          ShowToast.error(res.errMsg);
        }
        reject(res);
      },
    });
  });
};
