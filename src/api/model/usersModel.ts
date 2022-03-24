import { UserSex, UserStatus } from '/@/enums/userEnum';

export interface LoginParams {
  code: string;
}

export interface GetUserInfoResultModel {
  uname: string;
  usex: UserSex;
  uphone: number;
  cname: string;
  vname: string;
  bnum: string;
  hnum: string;
  hname: string;
  idCard: string;
  company: string;
  foreignStatus: UserStatus;
}
