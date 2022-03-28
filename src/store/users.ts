import { defineStore } from 'pinia';
import { ResultColor } from '/@/enums/colorEnum';
import { showLoading } from '/@/hooks/useShowMessage';
import { useWexinLogin } from '/@/hooks/useWexinLogin';
import { useWexinProfile } from '/@/hooks/useWexinProfile';
import { getUserInfo, updateUserProfile } from '/@/api/users';
import { UserStatusEnum, HealthEnum } from '/@/enums/userEnum';
import { setLocalCache, getLocalCache } from '/@/hooks/useLocalCache';
import { UserProfile, GetUserInfoResultModel as UserInfo } from '/@/api/model/usersModel';
import { TOKEN_KEY, USER_INFO_KEY, USER_PROFILE_KEY, USER_STATUS_KEY } from '/@/enums/cacheEnum';

interface UserStatus {
  key: string;
  data: string;
  title: string;
  color: string;
}
interface UserState {
  token?: string;
  userInfo: Nullable<UserInfo>;
  userStatus: Nullable<UserStatus[]>;
  userProfile: Nullable<UserProfile>;
  lastUpdateTime: number;
}

export const useUserStore = defineStore('users', {
  state: (): UserState => {
    return {
      token: undefined,
      userInfo: null,
      userStatus: null,
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
    getUserStatus(): UserStatus[] {
      return this.userStatus || getLocalCache(USER_STATUS_KEY) || {};
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
    setUserStatusAction(info: UserStatus[] | null) {
      this.userStatus = info;
      setLocalCache(USER_STATUS_KEY, info);
    },
    setUserProfileAction(info: UserProfile | null) {
      this.userProfile = info;
      setLocalCache(USER_PROFILE_KEY, info);
    },
    async getUserInfoAction() {
      const userInfo = await getUserInfo();
      this.setUserInfoAction(userInfo);
    },
    getUserProfileAction() {
      this.userProfile = getLocalCache(USER_PROFILE_KEY);
    },
    getUserStatusAction() {
      const healthStatus = {
        key: 'healthStatus',
        title: '风险等级',
        data: '',
        color: '',
      };
      switch (this.userInfo.healthStatus) {
        case HealthEnum.low:
          healthStatus.data = '低';
          healthStatus.color = ResultColor.SUCCESS;
          break;
        case HealthEnum.middle:
          healthStatus.data = '中';
          healthStatus.color = ResultColor.WARNING;
          break;
        case HealthEnum.high:
          healthStatus.data = '高';
          healthStatus.color = ResultColor.ERROR;
          break;
        default:
          healthStatus.data = '低';
          healthStatus.color = ResultColor.SUCCESS;
          break;
      }
      const isolationStatus = {
        key: 'isolationStatus',
        title: '隔离状态',
        data: this.userInfo.isolationStatus === UserStatusEnum.No ? '否' : '是',
        color:
          this.userInfo.isolationStatus === UserStatusEnum.No
            ? ResultColor.SUCCESS
            : ResultColor.ERROR,
      };
      const accessStatus = {
        key: 'accessStatus',
        title: '限制出入',
        data: this.userInfo.accessStatus === UserStatusEnum.No ? '否' : '是',
        color:
          this.userInfo.accessStatus === UserStatusEnum.No
            ? ResultColor.SUCCESS
            : ResultColor.ERROR,
      };
      const userStatus = [healthStatus, isolationStatus, accessStatus];
      this.setUserStatusAction(userStatus);
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
    async initStateAction() {
      // 接口请求info, 从缓存获取profile和status
      await this.getUserInfoAction();
      this.getUserProfileAction();
      this.getUserStatusAction();
    },
  },
  // TODO: pinia 缓存插件有些问题，暂时先使用Taro.setStorage
});
