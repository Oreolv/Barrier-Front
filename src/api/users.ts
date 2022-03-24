import { defHttp } from '/@/utils/axios';
import { LoginParams } from './model/usersModel';
enum Api {
  Login = '/resident/login',
}

export function login(params: LoginParams) {
  return defHttp.post<void>({ url: Api.Login, params });
}
