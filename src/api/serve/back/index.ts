import { defHttp } from '/@/utils/axios';
import { BasicPageParams } from '/@/api/model/baseModel';
import { CreateBackParams, GetBackListResultModel } from './model';
enum Api {
  CreateBack = '/back/createBack',
  GetBackList = '/back/getBackList',
  RemoveBack = '/back/removeBack',
}

export function createBack(params: CreateBackParams) {
  return defHttp.post<null>({ url: Api.CreateBack, params }, { showSuccessMessage: true });
}

export function getBackList(params: BasicPageParams) {
  return defHttp.get<GetBackListResultModel>({ url: Api.GetBackList, params });
}

export function removeBack(id: number) {
  return defHttp.delete<null>({ url: `${Api.RemoveBack}?id=${id}` }, { showSuccessMessage: true });
}
