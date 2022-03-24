import { defHttp } from '/@/utils/axios';
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoResultModel,
  UserProfile as UpdateUserProfileParams,
} from './model/usersModel';
enum Api {
  Login = '/resident/login',
  GetUserInfo = '/resident/getUserInfo',
  UpdateUserProfile = '/resident/updateUserProfile',
}

export function login(params: LoginParams) {
  return defHttp.post<LoginResultModel>({ url: Api.Login, params });
}

export function getUserInfo() {
  return defHttp.get<GetUserInfoResultModel>({ url: Api.GetUserInfo });
}

export function updateUserProfile(params: UpdateUserProfileParams) {
  return defHttp.put<null>({ url: Api.UpdateUserProfile, params });
}
