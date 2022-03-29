import { defineStore } from 'pinia';
import { getUserInfo } from '/@/api/users';
import { ResultColor } from '/@/enums/colorEnum';
import { useWexinLogin } from '/@/hooks/useWexinLogin';
import { useWexinProfile } from '/@/hooks/useWexinProfile';
import { UserStatusEnum, UserHealthEnum } from '/@/enums/userEnum';
import { showLoading, ShowModal, ShowToast } from '/@/hooks/useShowMessage';
import { setLocalCache, getLocalCache } from '/@/hooks/useLocalCache';
import { UserProfile, UserInfo } from '/@/api/model/usersModel';
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
      return !this.getUserLoginStatus || Boolean(this.getUserInfo.accessStatus != null) || false;
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
      const healthStatus = {
        key: 'healthStatus',
        title: '风险等级',
        data: '',
        color: '',
      };
      switch (userInfo.healthStatus) {
        case UserHealthEnum.low:
          healthStatus.data = '低';
          healthStatus.color = ResultColor.SUCCESS;
          break;
        case UserHealthEnum.middle:
          healthStatus.data = '中';
          healthStatus.color = ResultColor.WARNING;
          break;
        case UserHealthEnum.high:
          healthStatus.data = '高';
          healthStatus.color = ResultColor.ERROR;
          break;
        default:
          healthStatus.data = '高';
          healthStatus.color = ResultColor.ERROR;
          break;
      }
      const isolationStatus = {
        key: 'isolationStatus',
        title: '隔离状态',
        data: userInfo.isolationStatus === UserStatusEnum.No ? '否' : '是',
        color:
          userInfo.isolationStatus === UserStatusEnum.No ? ResultColor.SUCCESS : ResultColor.ERROR,
      };
      const accessStatus = {
        key: 'accessStatus',
        title: '限制出入',
        data: userInfo.accessStatus === UserStatusEnum.No ? '否' : '是',
        color:
          userInfo.accessStatus === UserStatusEnum.No ? ResultColor.SUCCESS : ResultColor.ERROR,
      };
      return [healthStatus, isolationStatus, accessStatus];
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
    logoutAction() {
      this.resetStateAction();
      this.setUserInfoAction(null);
      this.setTokenAction(undefined);
      this.setUserStatusAction(null);
      this.setUserProfileAction(null);
      ShowToast.success('退出成功');
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
  },
  // TODO: pinia 缓存插件有些问题，暂时先使用Taro.setStorage
});
