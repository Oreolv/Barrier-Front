import Taro from '@tarojs/taro';
import { defineStore } from 'pinia';
import { useWexinLogin } from '../hooks/useWexinLogin';
import { useWexinProfile } from '../hooks/useWexinProfile';
import { UserInfoProp, UserProfileProp } from '../model/user';
export const useUserStore = defineStore('users', {
  state: () => {
    return {
      userInfo: {} as UserInfoProp,
      userProfile: {} as UserProfileProp,
    };
  },
  getters: {},
  actions: {
    async login(): Promise<void> {
      const { nickName, avatar } = (await useWexinProfile()) as UserInfoProp;
      if (nickName) {
        Taro.showLoading({
          title: '正在登陆',
        });
        const { token, profile } = (await useWexinLogin()) as any;
        this.userProfile = profile as UserProfileProp;
        this.setInfo(token, nickName, avatar);
        Taro.setStorageSync('login', true);
        Taro.hideLoading();
      }
    },
    logout(): void {
      Taro.removeStorage({
        key: 'userInfo',
        success: () => {
          this.userInfo = {};
          Taro.setStorageSync('login', false);
          Taro.showToast({
            title: '退出成功',
            icon: 'success',
            duration: 2000,
          });
        },
      });
    },
    setInfo(token, nickName, avatar): void {
      this.userInfo.token = token;
      this.userInfo.nickName = nickName;
      this.userInfo.avatar = avatar;
      Taro.setStorage({
        key: 'userInfo',
        data: this.userInfo,
      });
    },
    getInfo(): void {
      Taro.getStorage({
        key: 'userInfo',
        success: (res) => {
          this.userInfo.token = res.data.token;
          this.userInfo.avatar = res.data.avatar;
          this.userInfo.nickName = res.data.nickName;
        },
      });
    },
    checkLogin(): boolean {
      return Taro.getStorageSync('login');
    },
  },
  // TODO: pinia 缓存插件有些问题，暂时先使用Taro.setStorage
});
