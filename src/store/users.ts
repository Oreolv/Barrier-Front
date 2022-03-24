import { defineStore } from 'pinia';
import { getUserInfo, updateUserProfile } from '/@/api/users';
import { TOKEN_KEY, USER_INFO_KEY, USER_PROFILE_KEY } from '/@/enums/cacheEnum';
import { setLocalCache, getLocalCache } from '/@/hooks/useLocalCache';
import { showLoading } from '/@/hooks/useShowMessage';
import { useWexinLogin } from '/@/hooks/useWexinLogin';
import { useWexinProfile } from '/@/hooks/useWexinProfile';
import { UserProfile, GetUserInfoResultModel as UserInfo } from '/@/api/model/usersModel';

interface UserState {
  token?: string;
  userInfo: Nullable<UserInfo>;
  userProfile: Nullable<UserProfile>;
  lastUpdateTime: number;
}

export const useUserStore = defineStore('users', {
  state: (): UserState => {
    return {
      token: undefined,
      userInfo: null,
      userProfile: null,
      lastUpdateTime: 0,
    };
  },
  getters: {
    getToken(): string {
      return this.token || getLocalCache(TOKEN_KEY);
    },
    getUserInfo(): UserInfo {
      return this.userInfo || getLocalCache(USER_INFO_KEY) || {};
    },
    getUserProfile(): UserInfo {
      return this.userProfile || getLocalCache(USER_PROFILE_KEY) || {};
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setTokenAction(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setLocalCache(TOKEN_KEY, info);
    },
    setUserInfoAction(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setLocalCache(USER_INFO_KEY, info);
    },
    setUserProfileAction(info: UserProfile | null) {
      this.userProfile = info;
      setLocalCache(USER_PROFILE_KEY, info);
    },
    async getUserInfoAction() {
      const userInfo = await getUserInfo();
      this.setUserInfoAction(userInfo);
      return userInfo;
    },
    getUserProfileAction() {
      this.userProfile = getLocalCache(USER_PROFILE_KEY);
    },
    async loginAction() {
      showLoading.loading('正在登陆');
      const userProfile = await useWexinProfile();
      const { token } = await useWexinLogin();
      this.setTokenAction(token);
      await updateUserProfile(userProfile);
      this.setUserProfileAction(userProfile);
      this.getUserInfoAction();
      showLoading.hideLoading();
    },
    logout() {
      this.setTokenAction(undefined);
      this.setUserInfoAction(null);
      this.setUserProfileAction(null);
    },
    resetStateAction() {
      this.userInfo = null;
      this.userProfile = null;
      this.token = undefined;
    },
  },
  // TODO: pinia 缓存插件有些问题，暂时先使用Taro.setStorage
});
