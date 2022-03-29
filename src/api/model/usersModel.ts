import { UserSexEnum, UserStatusEnum, UserHealthEnum } from '/@/enums/userEnum';

export interface LoginParams {
  code: string;
  profile: UserProfile;
}

export interface GetUserInfoResultModel {
  profile: UserProfile;
  uname: string;
  usex: UserSexEnum;
  uphone: number;
  cname: string;
  vname: string;
  bnum: string;
  hnum: string;
  hname: string;
  idCard: string;
  company: string;
  foreignStatus: UserStatusEnum;
  healthStatus: UserHealthEnum;
  isolationStatus: UserStatusEnum;
  accessStatus: UserStatusEnum;
}

export interface LoginResultModel {
  userId: number;
  token: string;
}

// 由微信获取，头像和昵称
export interface UserProfile {
  avatar: string;
  nickName: string;
}
