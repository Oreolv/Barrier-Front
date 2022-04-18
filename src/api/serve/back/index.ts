import { defHttp } from '/@/utils/axios';
import { CreateBackParams, GetBackListResultModel } from './model';
enum Api {
  CreateBack = '/back/createBack',
  GetBackList = '/back/getBackList',
}

export function createBack(params: CreateBackParams) {
  return defHttp.post<null>({ url: Api.CreateBack, params }, { showSuccessMessage: true });
}

export function getBackList() {
  return defHttp.get<GetBackListResultModel>({ url: Api.GetBackList });
}
