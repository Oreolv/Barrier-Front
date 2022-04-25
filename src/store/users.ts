import { defineStore } from 'pinia';
import { ResultColorEnum } from '/@/enums/colorEnum';
import { useWexinLogin } from '/@/hooks/useWexinLogin';
import { useWexinProfile } from '/@/hooks/useWexinProfile';
import { getUserInfo, updateUserProfile } from '/@/api/mine/users';
import { UserStatusEnum, UserHealthEnum } from '/@/enums/userEnum';
import { showLoading, ShowModal, ShowToast } from '/@/hooks/useShowMessage';
import { setLocalCache, getLocalCache } from '/@/hooks/useLocalCache';
import { UserProfile, UserInfo } from '/@/api/mine/model/usersModel';
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
    getUserProfile(): UserProfile {
      return this.userProfile || getLocalCache(USER_PROFILE_KEY) || {};
    },
    getUserStatus(): UserStatus[] {
      return this.userStatus || getLocalCache(USER_STATUS_KEY) || {};
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
    getUserLoginStatus(): boolean {
      return Boolean(this.getToken) || false;
    },
    checkUserInfoBinding(): boolean {
      // eslint-disable-next-line eqeqeq
      return !this.getUserLoginStatus || Boolean(this.getUserInfo.access_status != null) || false;
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
    getUserStatusAction(userInfo: UserInfo) {
      const health_status = {
        key: 'health_status',
        title: '风险等级',
        data: '',
        color: '',
      };
      switch (userInfo.health_status) {
        case UserHealthEnum.Low:
          health_status.data = '低';
          health_status.color = ResultColorEnum.SUCCESS;
          break;
        case UserHealthEnum.Middle:
          health_status.data = '中';
          health_status.color = ResultColorEnum.WARNING;
          break;
        case UserHealthEnum.High:
          health_status.data = '高';
          health_status.color = ResultColorEnum.ERROR;
          break;
        default:
          health_status.data = '高';
          health_status.color = ResultColorEnum.ERROR;
          break;
      }
      const isolation_status = {
        key: 'isolation_status',
        title: '隔离状态',
        data: userInfo.isolation_status === UserStatusEnum.No ? '否' : '是',
        color:
          userInfo.isolation_status === UserStatusEnum.No
            ? ResultColorEnum.SUCCESS
            : ResultColorEnum.ERROR,
      };
      const access_status = {
        key: 'access_status',
        title: '限制出入',
        data: userInfo.access_status === UserStatusEnum.No ? '否' : '是',
        color:
          userInfo.access_status === UserStatusEnum.No
            ? ResultColorEnum.SUCCESS
            : ResultColorEnum.ERROR,
      };
      return [health_status, isolation_status, access_status];
    },
    async loginAction() {
      showLoading.loading('正在登陆');
      const userProfile = await useWexinProfile();
      const { token } = await useWexinLogin(userProfile);
      this.setTokenAction(token);
      const userInfo = await getUserInfo();
      const userStatus = this.getUserStatusAction(userInfo);
      this.setUserInfoAction(userInfo);
      this.setUserStatusAction(userStatus);
      this.setUserProfileAction(userInfo.profile);
      showLoading.hideLoading();
      this.checkUserInfoBindingAction();
    },
    logoutAction(msg = '退出成功') {
      this.resetStateAction();
      this.setUserInfoAction(null);
      this.setTokenAction(undefined);
      this.setUserStatusAction(null);
      this.setUserProfileAction(null);
      ShowToast.success(msg);
    },
    resetStateAction() {
      this.userInfo = null;
      this.userProfile = null;
      this.token = undefined;
    },
    async initStateAction() {
      // 接口请求info, 更新info, profile和status
      const userInfo = await getUserInfo();
      this.setUserInfoAction(userInfo);
      this.setUserProfileAction(userInfo.profile);

      const userStatus = this.getUserStatusAction(userInfo);
      this.setUserStatusAction(userStatus);
    },
    checkUserInfoBindingAction() {
      // eslint-disable-next-line eqeqeq
      if (!this.checkUserInfoBinding) {
        ShowModal.info({
          title: '提示',
          content: '请前往社区绑定个人详细信息，否则出入小区将会受到限制。',
        });
      }
    },
    async updateUserProfile(profile: UserProfile) {
      const userInfo = await updateUserProfile(profile);
      this.setUserInfoAction(userInfo);
      this.setUserProfileAction(userInfo.profile);
    },
  },
  // TODO: pinia 缓存插件有些问题，暂时先使用Taro.setStorage
});
