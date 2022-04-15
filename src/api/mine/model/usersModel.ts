import { UserSexEnum, UserStatusEnum, UserHealthEnum } from '/@/enums/userEnum';

export interface LoginParams {
  code: string;
  uphone: string;
  profile: UserProfile;
}

export interface UserInfo {
  profile: UserProfile;
  uname: string;
  usex: UserSexEnum | string;
  uphone: number;
  cname: string;
  vname: string;
  bnum: string;
  hnum: string;
  hname: string;
  idCard: string;
  company: string;
  foreignStatus: UserStatusEnum | string;
  healthStatus: UserHealthEnum | string;
  isolationStatus: UserStatusEnum | string;
  accessStatus: UserStatusEnum | string;
}

export interface LoginResultModel {
  userId: number;
  token: string;
}

// 由微信获取，头像和昵称
export interface UserProfile {
  avatar?: string;
  nickName?: string;
}
