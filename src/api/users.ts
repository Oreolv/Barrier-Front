import { defHttp } from '/@/utils/axios';
import { LoginParams, LoginResultModel, GetUserInfoResultModel } from './model/usersModel';
enum Api {
  Login = '/resident/login',
  GetUserInfo = '/resident/getUserInfo',
}

export function getUserInfo() {
  return defHttp.get<GetUserInfoResultModel>({ url: Api.GetUserInfo });
}
